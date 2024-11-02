import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '@/app/screens/HomeScreen';
import RecipesScreen from '@/app/screens/RecipesScreen';
import ClaimScreen from '@/app/screens/ClaimScreen';
import MapScreen from '@/app/screens/MapScreen';
import * as ImagePicker from 'expo-image-picker';
import api from '@/services/AxiosConfig';

const Tab = createBottomTabNavigator();

interface Props {
	children?: any;
}

function CameraButton({ children }: Props) {
	const [image, setImage] = useState<string | null>(null);
	const [hasPermission, setHasPermission] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const { status } = await ImagePicker.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const pickImage = async () => {
		if (hasPermission === false) {
			Alert.alert('No camera permission', 'Please grant camera access in your settings.');
			return;
		}

		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			const fd = new FormData();
			fd.append('receipt', { name: 'receipt.jpeg', type: 'image/jpeg', uri: result.assets[0].uri } as any);

			api.post('/parse-receipt', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
				.then((resp) => {
					console.log(resp.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<>
			<TouchableOpacity
				style={{
					top: -15,
					justifyContent: 'center',
					alignItems: 'center',
					...styles.shadow,
				}}
				onPress={pickImage}
			>
				<View
					style={{
						width: 60,
						height: 60,
						borderRadius: 30,
						backgroundColor: '#e32f45',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Icon name="camera-outline" color="#fff" size={28} />
				</View>
			</TouchableOpacity>
		</>
	);
}

const Navbar = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					position: 'absolute',
					bottom: 30,
					left: 20,
					right: 20,
					backgroundColor: '#ffffff',
					borderRadius: 15,
					height: 65,
					...styles.shadow,
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => <Icon style={{ marginBottom: -25 }} name="home-outline" color={focused ? '#e32f45' : '#748c94'} size={24} />,
				}}
			/>
			<Tab.Screen
				name="Recipes"
				component={RecipesScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon style={{ marginBottom: -25 }} name="notifications-outline" color={focused ? '#e32f45' : '#748c94'} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name="Camera"
				component={CameraButton} // No actual screen, just the button
				options={{
					tabBarButton: (props) => <CameraButton {...props} />,
				}}
			/>
			<Tab.Screen
				name="Claim"
				component={ClaimScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon style={{ marginBottom: -25 }} name="person-outline" color={focused ? '#e32f45' : '#748c94'} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name="Map"
				component={MapScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon style={{ marginBottom: -25 }} name="settings-outline" color={focused ? '#e32f45' : '#748c94'} size={24} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = {
	shadow: {
		shadowColor: '#7F5DF0',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
};

export default Navbar;