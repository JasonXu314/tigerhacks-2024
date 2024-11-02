import api from '@/services/AxiosConfig';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as SecureStorage from 'expo-secure-store';
import { FoodItem } from '@/interfaces/FoodItem';

interface FoodContextType {
	foodItems: FoodItem[];
	updateFoodItems: (foodItems: FoodItem[]) => void;
}

export const FoodContext = createContext<FoodContextType>({
	foodItems: [],
	updateFoodItems: () => {},
});

export const FoodProvider = ({ children }: { children: ReactNode }) => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    
	const updateFoodItems = (foodItems: FoodItem[]) => {
        setFoodItems(foodItems);
	};

    useEffect(() => {
        const token = SecureStorage.getItem('token');
        if (token) {
            api.get(`/pantry?token=${token}`)
                .then((resp) => {
                    console.log(resp.data)
                    setFoodItems(resp.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

	return <FoodContext.Provider value={{ foodItems, updateFoodItems }}>{children}</FoodContext.Provider>;
};
