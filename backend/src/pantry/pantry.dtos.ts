import { IsString } from 'class-validator';
import { fi } from 'src/utils/utils';

export class AddFoodsDTO {
	@IsString({ each: true })
	names: string[] = fi();
}

export class OfferFoodDTO {
	@IsString()
	location: string = fi();
}
