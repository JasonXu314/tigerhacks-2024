import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { FoodData } from './foods.models';

@Injectable()
export class FoodsService {
	private readonly data: Promise<FoodData[]>;

	public constructor() {
		this.data = axios
			.get<{ category_data: any[]; product_data: FoodData[] }>('https://www.foodsafety.gov/sites/default/files/foodkeeper_data_url_en.json')
			.then((res) => res.data.product_data);
	}

	public async getExpDate(name: string, boughtDate: Date): Promise<Date> {
		const foods = (await this.data)
			.map<[FoodData, number]>((food) => {
				const q = name.toLowerCase();
				const vws = food.name.replace(/\s/g, '');
				const qws = q.replace(/\s/g, '');
				const vFrags = food.name.split(/\s/).filter((f) => f !== '');
				const qFrags = q.split(/\s/).filter((f) => f !== '');

				return [
					food,
					Number(food.name.includes(q)) +
						Number(q.includes(food.name)) +
						Number(vws.includes(qws)) +
						Number(qws.includes(vws)) +
						Number(qFrags.every((f) => vFrags.some((fragment) => fragment.includes(f) || f.includes(fragment))))
				];
			})
			.filter(([, score]) => score > 0)
			.sort(([, a], [, b]) => b - a)
			.map(([food]) => food);

		if (foods.length > 0) {
			const [food] = foods;

			const rawExp = food.from_date_of_purchase_refrigerate_output_display_only;
			const match = /(\d+\s*(?:-\s*\d+)?)\s*(\w+)/.exec(rawExp);

			if (match) {
				const qty = match[1].includes('-')
					? match[1]
							.split('-')
							.map((part) => part.trim())
							.map((part) => Number(part))
							.reduce((t, val, i, arr) => (i === arr.length - 1 ? (t + val) / arr.length : t + val), 0)
					: Number(match[1].trim());
				const unit = match[2].trim();

				if (unit === 'months') {
					return new Date(boughtDate.valueOf() + qty * 30 * 24 * 60 * 60 * 1000);
				} else {
					throw new InternalServerErrorException(`Unrecognized unit ${unit}`);
				}
			} else {
				throw new InternalServerErrorException(`No match for ${rawExp}`);
			}
		} else {
			throw new NotFoundException(`${name} not found`);
		}
	}
}

