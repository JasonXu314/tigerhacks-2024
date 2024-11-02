type User = import('@prisma/client').User;
type FoodItem = import('@prisma/client').FoodItem;

type UserAdminProps = {
	users: User[];
};

type UserPantryAdminProps = {
	items: FoodItem[];
};

type BrowseOffersProps = {
	offers: ({
		foodItem: {
			name: string;
			id: number;
			userId: string;
			boughtDate: Date;
			expDate: Date;
			image: string;
		};
		owner: {
			id: string;
			phone: string;
			firstName: string;
		};
	} & {
		userId: string;
		foodId: number;
		location: string;
	})[];
};

