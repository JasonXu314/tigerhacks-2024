import { IsInt, IsString } from 'class-validator';
import { fi } from 'src/utils/utils';

export class SignupDTO {
	@IsString()
	phone: string = fi();

	@IsString()
	firstName: string = fi();

	@IsString()
	lastName: string = fi();
}

export class VerifyDTO {
	@IsString()
	code: string = fi();
}

export class AlertContactsDTO {
	@IsString({ each: true })
	phones: string[] = fi();

	@IsInt()
	foodId: number = fi();
}

