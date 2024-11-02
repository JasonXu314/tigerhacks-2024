import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodItem, FoodOffer, User as UserT } from '@prisma/client';
import { Protected } from './auth/protected.decorator';
import { AddFoodsDTO, OfferFoodDTO } from './pantry/pantry.dtos';
import { Recipe } from './pantry/pantry.models';
import { PantryService } from './pantry/pantry.service';
import { Page } from './utils/decorators/page.decorator';
import { User } from './utils/decorators/user.decorator';

@Controller()
export class AppController {
	constructor(private readonly service: PantryService) {}

	@Page()
	@Get('/')
	public index(): PageProps {
		return {};
	}

	@Post('/parse-receipt')
	@UseInterceptors(FileInterceptor('receipt'))
	public async parseReceipt(@UploadedFile() file: Express.Multer.File): Promise<string[]> {
		return this.service.parseImage(file.buffer);
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
	@Post('/food-item/:id/offer')
	public async offerItem(@Param('id', ParseIntPipe) id: number, @Body() data: OfferFoodDTO, @User() user: UserT): Promise<FoodOffer> {
		return this.service.offerFood(id, user, data.location);
	}
}

