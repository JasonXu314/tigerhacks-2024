import { FoodProvider } from '@/contexts/FoodContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		JostRegular: require('../assets/fonts/Jost-Regular.ttf'),
		JostBold: require('../assets/fonts/Jost-Bold.ttf'),
		JostSemiBold: require('../assets/fonts/Jost-SemiBold.ttf')
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
			<Stack initialRouteName="/" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="LandingPage" options={{ headerShown: false }} />
				<Stack.Screen name="InstructionScreen" options={{ headerShown: false }} />
				<Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
				<Stack.Screen name="CorrectionScreen" options={{ headerShown: false }} />
				<Stack.Screen name="ContactsScreen" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" options={{ headerShown: false }} />
			</Stack>
		</FoodProvider>
	);
}

