import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { FoodData } from './foods.models';

@Injectable()
export class FoodsService {
	private readonly data: Promise<FoodData[]>;

	public constructor() {
		this.data = axios
			.get<{ category_data: any[]; product_data: FoodData[] }>('https://www.foodsafety.gov/sites/default/files/foodkeeper_data_url_en.json')
			.then((res) =>
				res.data.product_data.concat(
					(
						[
							['potatoes', '10 - 12 months', '2 weeks', null],
							['brussel sprouts', '12 - 14 months', '1 - 2 weeks', '3 - 4 days'],
							['grapes', '3 months', '1 - 2 weeks', null],
							['snow peas', '10 - 12 months', '1 week', null],
							['banana', '2 - 3 months', '2 - 9 days', '2 - 7 days']
						] as const
					).map(([name, freeze, fridge, pantry]) => ({
						category_id: '',
						category_name_display_only: '',
						from_date_of_purchase_freeze_output_display_only: freeze,
						from_date_of_purchase_refrigerate_output_display_only: fridge,
						id: '',
						keywords: '',
						name,
						pantry_tips: '',
						freeze_output_display_only: null,
						freeze_tips: null,
						from_date_of_purchase_freeze_tips: null,
						from_date_of_purchase_pantry_output_display_only: pantry,
						from_date_of_purchase_pantry_tips: null,
						from_date_of_purchase_refrigerate_tips: null,
						name_subtitle: null,
						pantry_after_opening_output_display_only: null,
						pantry_output_display_only: null,
						refrigerate_after_opening_output_display_only: null,
						refrigerate_after_thawing_output_display_only: null,
						refrigerate_output_display_only: null,
						refrigerate_tips: null,
						subcategory_name_display_only: null
					}))
				)
			);
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
						Number(qFrags.reduce((t, f) => (vFrags.some((fragment) => fragment.includes(f) || f.includes(fragment)) ? t + 1 : t), 0))
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

				if (unit.toLowerCase() === 'months' || unit.toLowerCase() === 'month') {
					return new Date(boughtDate.valueOf() + qty * 30 * 24 * 60 * 60 * 1000);
				} else if (unit.toLowerCase() === 'weeks' || unit.toLowerCase() === 'week') {
					return new Date(boughtDate.valueOf() + qty * 7 * 24 * 60 * 60 * 1000);
				} else if (unit.toLowerCase() === 'days' || unit.toLowerCase() === 'day') {
					return new Date(boughtDate.valueOf() + qty * 24 * 60 * 60 * 1000);
				} else {
					console.log(`Unrecognized unit ${unit}`);
					throw new InternalServerErrorException(`Unrecognized unit ${unit}`);
				}
			} else {
				console.log(`No match for ${rawExp}`);
				throw new InternalServerErrorException(`No match for ${rawExp}`);
			}
		} else {
			console.log(`${name} not found`);
			throw new NotFoundException(`${name} not found`);
		}
	}
}

