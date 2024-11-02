import notifee from '@notifee/react-native';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';

const Index = () => {
	const [token, setToken] = useState('');
	useEffect(() => {
		const userToken = SecureStore.getItem('token');
		if (userToken) {
			setToken(userToken);
		}

		notifee.requestPermission();
	}, []);

	if (token) {
		return <Redirect href="/HomeScreen" />;
	}
	return <Redirect href="/LandingPage" />;
};

export default Index;
