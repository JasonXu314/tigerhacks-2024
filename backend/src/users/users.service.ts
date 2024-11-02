import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { init } from '@paralleldrive/cuid2';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { randomBytes } from 'crypto';
import * as notifApi from 'notificationapi-node-server-sdk';
import { AuthDataSource } from 'src/auth/auth.module';
import { DBService } from 'src/db/db.service';
import { SignupDTO } from './users.dtos';

@Injectable()
export class UsersService implements AuthDataSource {
	private readonly cuid: () => string;
	private readonly codes: Map<string, string>;

	public constructor(private readonly db: DBService) {
		this.cuid = init({ length: 12 });

		notifApi.init(process.env.NOTIF_API_ID!, process.env.NOTIF_API_SECRET!);
		this.codes = new Map();
	}

	public async getAll(): Promise<User[]> {
		return this.db.user.findMany();
	}

	public async deleteUser(id: string): Promise<void> {
		await this.db.user.delete({ where: { id } });
	}

	public async auth(token: string): Promise<User | null> {
		return this.db.user.findUnique({ where: { token } });
	}

	public async signup(data: SignupDTO): Promise<User> {
		const id = this.cuid(),
			token = randomBytes(16).toString('hex');

		try {
			const user = await this.db.user.create({
				data: {
					id,
					token,
					verified: false,
					...data
				}
			});

			const code = Math.round(Math.random() * 999999)
				.toString()
				.padStart(6, '0');
			this.codes.set(user.token, code);
			setTimeout(() => this.codes.delete(user.token), 60_000);

			notifApi.send({
				notificationId: 'phone_confirmation',
				user: {
					id: user.phone,
					number: `+1${user.phone}`
				},
				mergeTags: {
					code: code
				}
			});

			return user;
		} catch (err: unknown) {
			if (err instanceof PrismaClientKnownRequestError) {
				if (err.code === 'P2002') {
					throw new BadRequestException('User phone and firstname+lastname must be unique');
				} else {
					console.log(err);
					throw new BadRequestException('Unknown error');
				}
			} else {
				console.error(err);
				throw new InternalServerErrorException('Unknown error');
			}
		}
	}

	public async claim(code: string, user: User): Promise<User> {
		console.log(this.codes);
		if (this.codes.get(user.token) === code) {
			return this.db.user.update({ where: { id: user.id }, data: { verified: true } });
		} else {
			throw new BadRequestException('Invalid verification code');
		}
	}
}

