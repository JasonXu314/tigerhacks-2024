import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule, DATA_SOURCE, PREFIX } from './auth/auth.module';
import { DBModule } from './db/db.module';
import { PantryModule } from './pantry/pantry.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { serveClient } from './utils/utils';

@Module({
	imports: [DBModule, UsersModule, PantryModule, AuthModule.register({ prefix: 'placeholder' }), ...serveClient()],
	controllers: [AppController],
	providers: [
		{ provide: PREFIX, useValue: 'placeholder' },
		{ provide: DATA_SOURCE, useClass: UsersService }
	]
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthMiddleware).forRoutes('*');
	}
}

