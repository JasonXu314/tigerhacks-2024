import { Module } from '@nestjs/common';
import { DBModule } from 'src/db/db.module';
import { FoodsModule } from 'src/foods/foods.module';
import { PantryService } from './pantry.service';

@Module({
	imports: [FoodsModule, DBModule],
	controllers: [],
	providers: [PantryService],
	exports: [PantryService]
})
export class PantryModule {}

