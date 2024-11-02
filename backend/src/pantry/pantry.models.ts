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

