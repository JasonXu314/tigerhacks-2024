import { FoodItem } from '@/interfaces/FoodItem';
import api from '@/services/AxiosConfig';
import * as SecureStorage from 'expo-secure-store';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface FoodContextType {
	foodItems: FoodItem[];
	updateFoodItems: (foodItems: FoodItem[]) => void;
}

export const FoodContext = createContext<FoodContextType>({
	foodItems: [],
	updateFoodItems: () => {}
});

export const FoodProvider = ({ children }: { children: ReactNode }) => {
	const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

	const updateFoodItems = (items: FoodItem[]) => {
		setFoodItems(items);
	};

	useEffect(() => {
		const token = SecureStorage.getItem('token');
		if (token) {
			api.get(`/pantry?token=${token}`)
				.then((resp) => {
					console.log(resp.data);
					setFoodItems(resp.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return <FoodContext.Provider value={{ foodItems, updateFoodItems }}>{children}</FoodContext.Provider>;
};

