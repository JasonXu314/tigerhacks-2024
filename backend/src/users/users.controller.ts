import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User as UserT } from '@prisma/client';
import { Protected } from 'src/auth/protected.decorator';
import { Page } from 'src/utils/decorators/page.decorator';
import { User } from 'src/utils/decorators/user.decorator';
import { SignupDTO, VerifyDTO } from './users.dtos';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Page()
	@Get('/admin')
	public async getAll(): Promise<PageProps<UserAdminProps>> {
		return {
			users: await this.service.getAll()
		};
	}

	@Get('/me')
	public getMe(@User() user: UserT | null): UserT | null {
		return user;
	}

	@Post('/signup')
	public async signup(@Body() data: SignupDTO): Promise<UserT> {
		return await this.service.signup(data);
	}

	@Protected()
	@Post('/resend')
	public async resend(@User() user: UserT): Promise<void> {
		console.log('resend', user);
		return this.service.resend(user);
	}

	@Protected()
	@Post('/verify')
	public async verify(@User() user: UserT, @Body() data: VerifyDTO): Promise<UserT> {
		return this.service.claim(data.code, user);
	}

	@Delete('/:id')
	public async deleteUser(@Param('id') id: string): Promise<void> {
		return this.service.deleteUser(id);
	}
}

