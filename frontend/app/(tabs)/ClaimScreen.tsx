import Trash from '@/components/bg/Trash';
import Loader from '@/components/Loader';
import { FoodItem } from '@/interfaces/FoodItem';
import api from '@/services/AxiosConfig';
import { SearchBar } from '@rneui/themed';
import * as Location from 'expo-location';
import * as SecureStorage from 'expo-secure-store';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

export default function ClaimScreen() {
	const [foodData, setFoodData] = useState<any>([]);
	const [tempFoodData, setTempFoodData] = useState<any>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [init, setInit] = useState(true);

	const getOffers = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert('Location access required. Please enable in settings.');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			api.get(`/offers?lat=${location.coords.latitude}&lng=${location.coords.longitude}&token=${SecureStorage.getItem('token')}`)
				.then((resp) => {
					setFoodData(resp.data);
					setTempFoodData(resp.data);
					setInit(false);
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
	const renderItem = ({ item }: { item: any }) => {
		return (
			<View
				style={[
					styles.rowFront,
					{
						backgroundColor:
							Math.ceil(Math.abs(new Date(item.foodItem.expDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) < 3
								? '#FFDFDF'
								: 'white'
					}
				]}>
				<Text style={styles.icon}>{item.foodItem.image}</Text>
				<View>
					<Text style={styles.title} numberOfLines={1}>
						{item.foodItem.name}
					</Text>
					<Text style={styles.exp}>
						Exp: {new Date(item.foodItem.expDate).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })}
					</Text>
				</View>
				<View style={{ marginLeft: 'auto' }}>
					<Text style={styles.number}>{formatPhoneNumber(item.owner.phone)}</Text>
					<Text style={styles.days}>
						{Math.ceil(Math.abs(new Date(item.foodItem.expDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{' '}
						{Math.ceil(Math.abs(new Date(item.expDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) === 1 ? 'day' : 'days'} left
					</Text>
				</View>
			</View>
		);
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		getOffers();
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	if (init) {
		return <Loader />;
	}

	return (
		<SafeAreaView>
			<SearchBar
				lightTheme
				round
				autoCorrect={false}
				containerStyle={styles.search}
				inputContainerStyle={{ backgroundColor: 'white' }}
				placeholder="Search"
				inputStyle={{ fontSize: 15, fontFamily: 'JostRegular' }}
				onChangeText={(val) => {
					setTempFoodData([...foodData.filter((food: any) => food.foodItem.name?.startsWith(val))]);
					setSearchValue(val);
				}}
				value={searchValue}
			/>
			{tempFoodData.length > 0 && (
				<SwipeListView
					data={tempFoodData}
					renderItem={renderItem}
					disableRightSwipe={true}
					disableLeftSwipe={true}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					style={{ height: '100%' }}
				/>
			)}
			{tempFoodData.length === 0 && (
				<View style={{ justifyContent: 'center', alignItems: 'center', height: '85%', gap: 15 }}>
					<Trash style={{ marginTop: -30, marginBottom: 30 }}></Trash>
					<Text style={{ color: '#606C38', fontFamily: 'JostRegular', fontSize: 15 }}>There is no food up for grabs right now...</Text>
					<Text style={{ color: '#606C38', fontFamily: 'JostRegular', fontSize: 15 }}>Come back later!</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	rowBack: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	search: {
		backgroundColor: 'white',
		borderBottomWidth: 0,
		borderTopWidth: 0
	},
	box: {
		width: 75,
		padding: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	boxText: {
		color: 'white',
		fontSize: 12,
		fontFamily: 'JostRegular'
	},
	rowFront: {
		backgroundColor: 'white',
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#EDECEC',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},
	icon: {
		fontSize: 32
	},
	title: {
		fontSize: 19,
		fontFamily: 'JostRegular',
		maxWidth: 190
	},
	exp: {
		fontSize: 14,
		fontFamily: 'JostRegular',
		color: '#606C38'
	},
	number: {
		fontSize: 18,
		fontFamily: 'JostRegular',
		color: 'black'
	},
	days: {
		fontSize: 15,
		fontFamily: 'JostRegular',
		color: '#606C38',
		textAlign: 'right'
	}
});

