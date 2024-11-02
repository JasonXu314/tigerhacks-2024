import { IsString } from 'class-validator';
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
