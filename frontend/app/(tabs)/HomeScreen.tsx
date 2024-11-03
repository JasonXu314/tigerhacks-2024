import { FoodContext } from '@/contexts/FoodContext';
import { FoodItem } from '@/interfaces/FoodItem';
import api from '@/services/AxiosConfig';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import * as SecureStorage from 'expo-secure-store';
import React, { useContext, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
	const { foodItems, updateFoodItems } = useContext(FoodContext);
	const [refreshing, setRefreshing] = useState(false);
	const router = useRouter();

	const rowRefs = useRef<Record<string, SwipeRow<FoodItem>>>(null);
	const openRowRef = useRef<any>(null);

	const closeRow = (rowMap: any, rowKey: any) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

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
			<Text style={styles.icon}>{item.image}</Text>
			<View>
				<Text style={styles.title}>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</Text>
				<Text style={styles.exp}>Exp: {new Date(item.expDate).toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })}</Text>
			</View>
			<Text style={styles.days}>{Math.ceil(Math.abs(new Date(item.expDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left</Text>
		</View>
	);

	const deleteItem = (id: number) => {
		api.delete(`/food-item/${id}?token=${SecureStorage.getItem('token')}`)
			.then((resp) => {
				updateFoodItems([...foodItems.filter((item) => item.id != id)]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const offerToPublic = async (id: number) => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert('Location access required. Please enable in settings.');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			api.post(`/food-item/${id}/offer?token=${SecureStorage.getItem('token')}`, {
				lng: location.coords.longitude,
				lat: location.coords.latitude,
			})
				.then((resp) => {
					console.log(resp.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.error('Error requesting location permission:', error);
		}
	};

	const renderHiddenItem = (data: any, rowMap: any) => (
		<View style={styles.rowBack}>
			<TouchableOpacity
				style={[styles.box, { backgroundColor: '#439C54' }]}
				onPress={() => {
					closeRow(rowMap, data.item.id);
					Alert.alert('Make Food Public', 'Are you sure you want to make your food publicly available? Your phone number will be shared.', [
						{
							text: 'Cancel',
							style: 'cancel',
						},
						{ text: 'OK', onPress: () => offerToPublic(data.item.id) },
					]);
				}}
			>
				<Icon name="globe-outline" color="#fff" size={20} />
				<Text style={styles.boxText}>Public</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.box, { backgroundColor: '#5BB46C' }]}
				onPress={() => {
                    closeRow(rowMap, data.item.id);
					router.navigate({ pathname: '/ContactsScreen', params: { id: data.item.id } });
				}}
			>
				<Icon name="person-outline" color="#fff" size={20} />
				<Text style={styles.boxText}>Friends</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.box, { backgroundColor: '#FF4848' }]} onPress={() => deleteItem(data.item.id)}>
				<Icon name="trash-outline" color="#fff" size={20} />
				<Text style={styles.boxText}>Delete</Text>
			</TouchableOpacity>
		</View>
	);

	const onSwipeValueChange = (swipeData: any) => {
		const { key, value } = swipeData;
		if (value < -20 && rowRefs.current) {
			rowRefs.current[key].manuallySwipeRow(-225);
		}
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<SwipeListView
			data={foodItems}
			renderItem={renderItem}
			renderHiddenItem={renderHiddenItem}
			rightOpenValue={-225}
			disableRightSwipe={true}
			tension={200}
			friction={10}
			previewOpenValue={-40}
			previewOpenDelay={300}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			onSwipeValueChange={onSwipeValueChange}
            keyExtractor={(item) => item.id}
		/>
	);
};

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
	days: {
		fontSize: 17,
		fontFamily: 'JostRegular',
		marginLeft: 'auto',
		color: '#606C38',
	},
});

export default HomeScreen;
