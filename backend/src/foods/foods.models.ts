export interface FoodData {
	category_id: string;
	category_name_display_only: string;
	freeze_output_display_only: string | null;
	freeze_tips: string | null;
	// freeze exp date
	from_date_of_purchase_freeze_output_display_only: string;
	from_date_of_purchase_freeze_tips: string | null;
	// pantry exp date
	from_date_of_purchase_pantry_output_display_only: string | null;
	from_date_of_purchase_pantry_tips: string | null;
	// refrigerated exp date
	from_date_of_purchase_refrigerate_output_display_only: string;
	from_date_of_purchase_refrigerate_tips: string | null;
	id: string;
	keywords: string;
	name: string;
	name_subtitle: string | null;
	pantry_after_opening_output_display_only: string | null;
	pantry_output_display_only: string | null;
	pantry_tips: string;
	refrigerate_after_opening_output_display_only: string | null;
	refrigerate_after_thawing_output_display_only: string | null;
	refrigerate_output_display_only: string | null;
	refrigerate_tips: string | null;
	subcategory_name_display_only: string | null;
}

