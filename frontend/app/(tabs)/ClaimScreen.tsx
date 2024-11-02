import React, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, RefreshControl } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { FoodContext } from '@/contexts/FoodContext';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '@/services/AxiosConfig';
import { createContext, ReactNode, useEffect } from 'react';
import * as SecureStorage from 'expo-secure-store';
import { FoodItem } from '@/interfaces/FoodItem';
import * as Location from 'expo-location';

export default function ClaimScreen() {
	const [foodData, setFoodData] = useState<FoodItem[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	const getOffers = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert('Location access required. Please enable in settings.');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			api.get(`/offers?lat=${location.coords.latitude}&lng=${location.coords.longitude}`)
				.then((resp) => {
					setFoodData(resp.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.error('Error requesting location permission:', error);
		}
	};

	useEffect(() => {
		getOffers();
	}, []);

	const formatPhoneNumber = (num: string) => {
		const areaCode = num.slice(0, 3);
		const firstPart = num.slice(3, 6);
		const secondPart = num.slice(6);

		return `(${areaCode}) ${firstPart}-${secondPart}`;
	};

	const rowRefs = useRef<Record<string, SwipeRow<FoodItem>>>(null);
	const renderItem = ({ item }: { item: any }) => (
		<View
			style={[
				styles.rowFront,
				{
					backgroundColor:
						Math.ceil(Math.abs(new Date(item.expDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) < 3 ? '#FFDFDF' : 'white',
				},
			]}
		>
			<Text style={styles.icon}>{item.foodItem.image}</Text>
			<View>
				<Text style={styles.title}>{item.foodItem.name.charAt(0).toUpperCase() + item.foodItem.name.slice(1).toLowerCase()}</Text>
				<Text style={styles.exp}>
					Exp: {new Date(item.foodItem.expDate).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })}
				</Text>
			</View>
			<View style={{ marginLeft: 'auto' }}>
				<Text style={styles.number}>{formatPhoneNumber(item.owner.phone)}</Text>
				<Text style={styles.days}>
					{Math.ceil(Math.abs(new Date(item.foodItem.expDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
				</Text>
			</View>
		</View>
	);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
        getOffers();
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<SafeAreaView>
			<TouchableOpacity
				onPress={() => {
					SecureStorage.deleteItemAsync('token');
				}}
			>
				<Text>clear storage</Text>
			</TouchableOpacity>
			<SwipeListView
				data={foodData}
				renderItem={renderItem}
				disableRightSwipe={true}
				disableLeftSwipe={true}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                style={{height: '100%'}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	rowBack: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	box: {
		width: 75,
		padding: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	boxText: {
		color: 'white',
		fontSize: 12,
		fontFamily: 'JostRegular',
	},
	rowFront: {
		backgroundColor: 'white',
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#EDECEC',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	icon: {
		fontSize: 32,
	},
	title: {
		fontSize: 19,
		fontFamily: 'JostRegular',
	},
	exp: {
		fontSize: 14,
		fontFamily: 'JostRegular',
		color: '#606C38',
	},
	number: {
		fontSize: 18,
		fontFamily: 'JostRegular',
		color: 'black',
	},
	days: {
		fontSize: 15,
		fontFamily: 'JostRegular',
		color: '#606C38',
		textAlign: 'right',
	},
});
