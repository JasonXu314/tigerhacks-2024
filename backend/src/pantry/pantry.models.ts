import { FoodItem } from '@prisma/client';

export interface OCRLine {
	text: string;
	confidence: number;
}

export interface Recipe {
	id: number;
	image: string;
	imageType: string;
	likes: number;
	missedIngredientCount: number;
	missedIngredients: Ingredient[];
	title: string;
	unusedIngredients: Ingredient[];
	usedIngredientCount: number;
	usedIngredients: Ingredient[];
}

export interface FullRecipe {
	id: number;
	title: string;
	image: string;
	imageType: string;
	servings: number;
	readyInMinutes: number;
	cookingMinutes: number;
	preparationMinutes: number;
	license: string;
	sourceName: string;
	sourceUrl: string;
	spoonacularSourceUrl: string;
	healthScore: number;
	spoonacularScore: number;
	pricePerServing: number;
	analyzedInstructions: any[];
	cheap: boolean;
	creditsText: string;
	cuisines: any[];
	dairyFree: boolean;
	diets: string[];
	gaps: 'no' | 'yes';
	glutenFree: boolean;
	// instructions: string;
	ketogenic: boolean;
	lowFodmap: boolean;
	occasions: string[];
	sustainable: boolean;
	vegan: boolean;
	vegetarian: boolean;
	veryHealthy: boolean;
	veryPopular: boolean;
	whole30: boolean;
	weightWatcherSmartPoints: number;
	dishTypes: string[];
	extendedIngredients: ExtIngredient[];
	summary: string;
	winePairing: {
		pairedWines: string[];
		pairingText: string;
		productMatches: Wine[];
	};
}

export interface Instruction {
	name: string;
	steps: Step[];
}

export interface Step {
	equipment: {
		id: number;
		image: string;
		name: string;
		[k: string]: any;
	}[];
	ingredients: {
		id: number;
		image: string;
		name: string;
	}[];
	number: number;
	step: string;
}

export interface Ingredient {
	aisle: string;
	amount: number;
	id: number;
	image: string;
	meta: any[];
	name: string;
	original: string;
	originalName: string;
	unit: string;
	unitLong: string;
	unitShort: string;
}

export interface ExtIngredient extends Ingredient {
	measures: Record<string, { amount: number; unitLong: string; unitShort: string }>;
}

export interface Wine {
	id: number;
	title: string;
	description: string;
	price: string;
	imageUrl: string;
	averageRating: number;
	ratingCount: number;
	score: number;
	link: string;
}

export type UserFoodItem = FoodItem & { public: boolean };
