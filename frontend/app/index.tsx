import api from '@/services/AxiosConfig';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import 'react-native-gesture-handler';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
});

const Index = () => {
	const [token, setToken] = useState('');
	const [loading, setLoading] = useState(true);

	const [expoPushToken, setExpoPushToken] = useState('');
	const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
	const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token));

		if (Platform.OS === 'android') {
			Notifications.getNotificationChannelsAsync().then((value) => setChannels(value ?? []));
		}
		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response);
		});

		return () => {
			notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
			responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	useEffect(() => {
		const userToken = SecureStore.getItem('token');
		if (userToken) {
			api.get(`/users/me?token=${userToken}`)
				.then((resp) => {
					setToken(userToken);
					setLoading(false);
				})
				.catch((err) => {
					SecureStore.deleteItemAsync('token');
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, []);

	if (loading) {
		return <View></View>;
	}

	if (token) {
		return <Redirect href="/HomeScreen" />;
	}
	return <Redirect href="/LandingPage" />;
};

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C'
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		try {
			const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
			if (!projectId) {
				throw new Error('Project ID not found');
			}
			token = (
				await Notifications.getExpoPushTokenAsync({
					projectId
				})
			).data;
			console.log(token);
		} catch (e) {
			token = `${e}`;
		}
	} else {
		alert('Must use physical device for Push Notifications');
	}

	return token;
}

export default Index;

