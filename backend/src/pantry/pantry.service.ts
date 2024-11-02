import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { init } from '@paralleldrive/cuid2';
import { FoodItem, FoodOffer, User } from '@prisma/client';
import axios from 'axios';
import { spawn } from 'child_process';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { DBService } from 'src/db/db.service';
import { FoodsService } from 'src/foods/foods.service';
import { publicAttrs } from 'src/users/users.models';
import { AddFoodsDTO } from './pantry.dtos';
import { OCRLine, Recipe } from './pantry.models';

@Injectable()
export class PantryService {
	private readonly cuid: () => string;

	public constructor(private readonly foods: FoodsService, private readonly db: DBService) {
		this.cuid = init({ length: 8 });
	}

	public async parseImage(img: Buffer): Promise<string[]> {
		const tmpFile = `tmp/${this.cuid()}`,
			outFile = `tmp/${this.cuid()}`;

		writeFileSync(tmpFile, img);

		const proc = spawn('./bin/tesser', [tmpFile, outFile]);

		await new Promise<void>((resolve, reject) => proc.on('exit', (status) => (status === 0 ? resolve() : reject('OCR Error'))));
		const out = readFileSync(outFile).toString();

		try {
			const lines = JSON.parse(out) as OCRLine[];

			rmSync(tmpFile);
			rmSync(outFile);
			console.log(lines);

			return lines
				.filter((ln) => ln.confidence >= 0.5)
				.map((ln) => this._preprocess(ln.text))
				.filter((food) => food !== null);
		} catch (err) {
			console.log(err, out);
			console.log('outfile', outFile);
			throw new InternalServerErrorException('Failed to recognize text');
		}
	}

	public async getFoods(user: User): Promise<FoodItem[]> {
		return this.db.foodItem.findMany({ where: { userId: user.id } });
	}

	public async addFoods(dto: AddFoodsDTO, user: User): Promise<FoodItem[]> {
		const now = new Date();
		console.log(user);
		const foods = await Promise.all(
			dto.names.map(async (name) => ({
				userId: user.id,
				name,
				boughtDate: now,
				expDate: await this.foods.getExpDate(name, now),
				image:
					[
						['potatoes', '🥔'],
						['grapes', '🍇'],
						['snow peas', '🫛'],
						['steak', '🥩'],
						['buns', '🥖'],
						['toast', '🍞']
					].reduce((emote, [n, e]) => (name.toLowerCase().includes(n) ? e : emote), '') || '🥬'
			}))
		);

		await this.db.foodItem.createMany({
			data: foods
		});

		console.log(user);
		return this.db.foodItem.findMany({ where: { userId: user.id } });
	}

	public async removeFood(id: number, user: User): Promise<void> {
		await this.db.foodItem.delete({ where: { userId_id: { userId: user.id, id } } });
	}

	public async getRecipes(user: User): Promise<Recipe[]> {
		const ingredients = await this.db.foodItem.findMany({ where: { userId: user.id } });

		return axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.map((food) => food.name).join(',')}&number=20`, {
			headers: { 'X-Api-Key': process.env.SPOONACULAR_KEY! }
		});
	}

	public async getOffers(location?: string) {
		return this.db.foodOffer.findMany({
			where: { location },
			include: {
				foodItem: true,
				owner: publicAttrs
			}
		});
	}

	public async offerFood(id: number, user: User, location: string): Promise<FoodOffer> {
		return this.db.foodOffer.create({
			data: { foodItem: { connect: { userId_id: { id, userId: user.id } } }, owner: { connect: { id: user.id } }, location }
		});
	}

	public async deleteOffer(userId: string, foodId: number): Promise<void> {
		await this.db.foodOffer.delete({ where: { userId_foodId: { userId, foodId } } });
	}

	public async completeOffer(id: number, user: User): Promise<void> {
		const offer = await this.db.foodOffer.findUnique({ where: { userId_foodId: { foodId: id, userId: user.id } } });

		if (offer) {
			await this.db.$transaction([
				this.db.foodOffer.delete({ where: { userId_foodId: { foodId: id, userId: user.id } } }),
				this.db.foodItem.delete({ where: { userId_id: { id, userId: user.id } } })
			]);
		} else {
			throw new BadRequestException('Offer does not exist');
		}
	}

	private _preprocess(ocrLine: string): string | null {
		const match = /^([^$@]+)\s*\$.*/.exec(ocrLine);

		if (match) {
			return match[1].trim();
		} else {
			return null;
		}
	}
}

