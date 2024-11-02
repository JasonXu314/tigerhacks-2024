import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RecipesScreen from './screens/RecipesScreen';
import Navbar from '@/components/Navbar';
import { FoodProvider } from '@/contexts/FoodContext';
import CorrectionScreen from './screens/Correction';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	return (
		<FoodProvider>
			<NavigationContainer independent={true}>
				<Stack.Navigator>
					{isLoggedIn ? (
						<>
							<Stack.Screen name="screens/HomeScreen" component={Navbar} options={{ headerShown: false }} />
							<Stack.Screen name="screens/Correction" component={CorrectionScreen} options={{ headerShown: false }} />
						</>
					) : (
						<Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }}>
							{(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
						</Stack.Screen>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</FoodProvider>
	);
}
