import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FoodItem {
  name: string;
  image: string;
  expirationDate: string;
}

interface FoodContextType {
  foodItems: FoodItem[];
  updateFoodItems: (foodItems: FoodItem[]) => void;
}

export const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  const updateFoodItems = (foodItems: FoodItem[]) => {
    setFoodItems(foodItems);
  };

  return (
    <FoodContext.Provider value={{ foodItems, updateFoodItems }}>
      {children}
    </FoodContext.Provider>
  );
};
