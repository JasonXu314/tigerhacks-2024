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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<FoodProvider>
			<Stack.Navigator>
				{isLoggedIn ? (
					<Stack.Screen name="screens/HomeScreen" component={Navbar} options={{ headerShown: false }} />
				) : (
					<Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }}>
						{(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
					</Stack.Screen>
				)}
			</Stack.Navigator>
		</FoodProvider>
	);
}
