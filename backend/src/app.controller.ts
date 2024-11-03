import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodItem, FoodOffer, User as UserT } from '@prisma/client';
import axios from 'axios';
import { Protected } from './auth/protected.decorator';
import { AddFoodsDTO, OfferFoodDTO } from './pantry/pantry.dtos';
import { FullRecipe, Instruction, Recipe } from './pantry/pantry.models';
import { PantryService } from './pantry/pantry.service';
import { AlertContactsDTO } from './users/users.dtos';
import { UsersService } from './users/users.service';
import { Page } from './utils/decorators/page.decorator';
import { User } from './utils/decorators/user.decorator';

@Controller()
export class AppController {
	constructor(private readonly service: PantryService, private readonly users: UsersService) {}

	@Page()
	@Get('/users/:id/pantry')
	public async getPantryAdmin(@Param('id') id: string): Promise<PageProps<UserPantryAdminProps>> {
		return {
			items: await this.service.getFoods({ id } as UserT)
		};
	}

	@Page()
	@Get('/browse')
	public async browseOffers(@Query('location') location?: string): Promise<PageProps<BrowseOffersProps>> {
		return {
			offers: await this.service.getOffers(location)
		};
	}

	@Post('/parse-receipt')
	@UseInterceptors(FileInterceptor('receipt'))
	public async parseReceipt(@UploadedFile() file: Express.Multer.File): Promise<string[]> {
		return this.service.parseImage(file.buffer);
	}

	@Protected()
	@Get('/pantry')
	public async getPantry(@User() user: UserT): Promise<FoodItem[]> {
		return this.service.getFoods(user);
	}

	@Protected()
	@Post('/add-food')
	public async addFood(@Body() data: AddFoodsDTO, @User() user: UserT): Promise<FoodItem[]> {
		return this.service.addFoods(data, user);
	}

	@Protected()
	@Delete('/food-item/:id')
	public async removeFood(@Param('id', ParseIntPipe) id: number, @User() user: UserT): Promise<void> {
		return this.service.removeFood(id, user);
	}

	@Protected()
	@Get('/recipes')
	public async getMyRecipes(@User() user: UserT): Promise<Recipe[]> {
		return this.service.getRecipes(user);
	}

	@Protected()
	@Get('/recipe-details')
	public async getRecipeDetails(@Query('id', ParseIntPipe) id: number): Promise<FullRecipe & { instructions: Instruction[] }> {
		return this.service.getDetails(id);
	}

	@Get('/city')
	public async getCity(@Query() data: OfferFoodDTO): Promise<string> {
		return axios
			.get(`https://api.geoapify.com/v1/geocode/reverse?apiKey=${process.env.GEOAPIFY_KEY}&lat=${data.lat}&lon=${data.lng}&type=city&format=json`)
			.then((req) => req.data.results[0].city);
	}

	@Protected()
	@Post('/food-item/:id/offer')
	public async offerItem(@Param('id', ParseIntPipe) id: number, @Body() data: OfferFoodDTO, @User() user: UserT): Promise<FoodOffer> {
		const city = await this.getCity(data);

		return this.service.offerFood(id, user, city);
	}

	@Delete('/:userId/offers/:id')
	public async deleteOffer(@Param('userId') userId: string, @Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.service.deleteOffer(userId, id);
	}

	@Get('/offers')
	public async getOfferedItems(@Query('lat') lat: string, @Query('lng') lng: string, @User() user: UserT | null) {
		return this.service.getOffers(await this.getCity({ lat, lng }), user);
	}

	@Protected()
	@Post('/alert-contacts')
	public async alertContacts(@User() user: UserT, @Body() data: AlertContactsDTO): Promise<void> {
		return this.users.alertContacts(user, data);
	}
}

