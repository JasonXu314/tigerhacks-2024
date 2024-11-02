import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';

@Module({
	imports: [],
	controllers: [],
	providers: [FoodsService],
	exports: [FoodsService]
})
export class FoodsModule {}

