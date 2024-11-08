import Charity from '@/components/TabIcons/Charity';
import CharityColored from '@/components/TabIcons/CharityColored';
import Pantry from '@/components/TabIcons/Pantry';
import PantryColored from '@/components/TabIcons/PantryColored';
import Recipes from '@/components/TabIcons/Recipes';
import RecipesColored from '@/components/TabIcons/RecipesColored';
import Search from '@/components/TabIcons/Search';
import SearchColored from '@/components/TabIcons/SearchColored';
import api from '@/services/AxiosConfig';
import * as ImagePicker from 'expo-image-picker';
import { router, Tabs } from 'expo-router';
import * as SecureStorage from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
	children?: any;
}

function CameraButton() {
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
			quality: 1
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			const fd = new FormData();
			fd.append('receipt', { name: 'receipt.jpeg', type: 'image/jpeg', uri: result.assets[0].uri } as any);

			api.post('/parse-receipt', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
				.then((resp) => {
					if (resp.data) {
						router.navigate({
							pathname: '/CorrectionScreen',
							params: { data: JSON.stringify(resp.data) }
						});
					}
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
					...styles.shadow
				}}
				onPress={pickImage}>
				<View
					style={{
						width: 60,
						height: 60,
						borderRadius: 30,
						backgroundColor: '#6DC47E',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<Icon name="camera-outline" color="#fff" size={28} />
				</View>
			</TouchableOpacity>
		</>
	);
}

const Navbar = () => {
	return (
		<Tabs
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
					...styles.shadow
				},
				header: (props) => (
					<SafeAreaView style={{ backgroundColor: '#6DC47E', height: 130, flexDirection: 'row' }}>
						<Text
							style={{
								fontFamily: 'JostRegular',
								fontSize: 30,
								paddingLeft: 10,
								color: 'white',
								marginTop: 'auto',
								marginBottom: 10,
								marginLeft: 12
							}}>
							{props.options.title}
						</Text>
						<TouchableOpacity
							style={{ marginLeft: 'auto', alignSelf: 'center', marginRight: 20, backgroundColor: '#439C54', padding: 10, borderRadius: 10 }}
							onPress={() => {
								SecureStorage.deleteItemAsync('token');
								router.navigate('/LandingPage');
							}}>
							<Text style={{ fontFamily: 'JostRegular', color: 'white' }}>Sign out</Text>
						</TouchableOpacity>
					</SafeAreaView>
				)
			}}>
			<Tabs.Screen
				name="HomeScreen"
				options={{
					tabBarIcon: ({ focused }) => (focused ? <PantryColored style={{ marginBottom: -25 }} /> : <Pantry style={{ marginBottom: -25 }} />),
					title: 'My Pantry'
				}}
			/>
			<Tabs.Screen
				name="RecipesScreen"
				options={{
					tabBarIcon: ({ focused }) => (focused ? <RecipesColored style={{ marginBottom: -25 }} /> : <Recipes style={{ marginBottom: -25 }} />),
					title: 'Recipes'
				}}
			/>
			<Tabs.Screen
				name="CameraScreen"
				options={{
					tabBarButton: (props) => <CameraButton {...props} />
				}}
			/>
			<Tabs.Screen
				name="MapScreen"
				options={{
					tabBarIcon: ({ focused }) => (focused ? <CharityColored style={{ marginBottom: -25 }} /> : <Charity style={{ marginBottom: -25 }} />),
					title: 'Donation Centers'
				}}
			/>
			<Tabs.Screen
				name="ClaimScreen"
				options={{
					tabBarIcon: ({ focused }) => (focused ? <SearchColored style={{ marginBottom: -25 }} /> : <Search style={{ marginBottom: -25 }} />),
					title: 'Community Food'
				}}
			/>
		</Tabs>
	);
};

const styles = {
	shadow: {
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5
	}
};

export default Navbar;

