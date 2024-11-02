import { Prisma } from '@prisma/client';

export const publicAttrs = Prisma.validator<Prisma.UserDefaultArgs>()({
	select: {
		id: true,
		phone: true,
		firstName: true
	}
});

export type PublicUser = Prisma.UserGetPayload<typeof publicAttrs>;
