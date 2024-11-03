import BackArrow from '@/components/BackArrow';
import { FoodContext } from '@/contexts/FoodContext';
import { FoodItem } from '@/interfaces/FoodItem';
import api from '@/services/AxiosConfig';
import * as Notifications from 'expo-notifications';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SecureStorage from 'expo-secure-store';
import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

interface Scan {
	id: number;
	text: string;
}

const CorrectionScreen = () => {
	const { data }: { data: string } = useLocalSearchParams();
	const router = useRouter();
	const { updateFoodItems } = useContext(FoodContext);

	const [editing, setEditing] = useState(false);
	const [foodData, setFoodData] = useState(
		JSON.parse(data).map((str: string, i: number) => ({
			id: i,
			text: str,
		}))
	);

	const pressHandler = () => {
		const foods = foodData.map((item: Scan) => {
			return item['text'];
		});
		api.post<FoodItem[]>(`/add-food?token=${SecureStorage.getItem('token')}`, {
			names: foods,
		})
			.then((resp) => {
				updateFoodItems(resp.data);

				Notifications.getAllScheduledNotificationsAsync().then((noti) => {
					resp.data.forEach(({ name, expDate, boughtDate, id }) => {
						if (!noti.some((obj) => obj.content.data.id === id.toString)) {
							const remaining = Math.max(
								0.75 * (new Date(expDate).getTime() - new Date(boughtDate).getTime()),
								new Date(expDate).getTime() - new Date(boughtDate).getTime() - 30 * 24 * 60 * 60 * 1000
							);
							const [timeLeft, units] =
								remaining > 7 * 24 * 60 * 60 * 1000
									? [Math.floor(remaining / (7 * 24 * 60 * 60 * 1000)), 'weeks']
									: remaining > 24 * 60 * 60 * 1000
									? [Math.floor(remaining / (24 * 60 * 60 * 1000)), 'days']
									: [Math.floor(remaining / 1000), 'seconds'];
							Notifications.scheduleNotificationAsync({
								content: {
									title: 'Food expiring!',
									body: `Your ${name} are expiring in ${timeLeft} ${units}!`,
									data: { id: id.toString() },
								},
								trigger: { date: new Date(boughtDate).getTime() + remaining },
							});
						}
					});
				});
			})
			.catch((err) => {
				console.log(err);
			});
		router.back();
	};

	const deleteRow = (id: number) => {
		setFoodData([...foodData.filter((obj: Scan) => obj.id !== id)]);
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }} style={{ width: '100%' }}>
				<View style={{ padding: 20, height: '100%', width: '100%', justifyContent: 'center' }}>
					<View style={styles.box}>
						<View style={styles.header}>
							<BackArrow></BackArrow>
						</View>
						<Text style={styles.title}>Does this look correct?</Text>
						<ScrollView contentContainerStyle={{ display: 'flex', gap: 8 }}>
							{foodData.map((obj: Scan, i: number) => (
								<View key={obj.id}>
									{!editing && <Text key={obj.id}>{obj.text}</Text>}
									{editing && (
										<View key={obj.id} style={{ display: 'flex', flexDirection: 'row', gap: 10, width: '100%' }}>
											<TextInput
												autoCapitalize="characters"
												onChangeText={(e) => {
													let temp = foodData;
													const idx = temp.findIndex((ob: Scan) => ob.id === obj.id);
													if (idx > -1) {
														temp[idx] = { id: obj.id, text: e };
														setFoodData([...temp]);
													}
												}}
												value={obj.text}
												style={styles.input}
											></TextInput>
											<TouchableOpacity onPress={() => deleteRow(obj.id)}>
												<Icon name="trash-outline" color="red" size={20} />
											</TouchableOpacity>
										</View>
									)}
								</View>
							))}
							{editing && <TouchableOpacity
								style={styles.editButton}
								onPress={() =>
									setFoodData([...foodData, { id: foodData.length - 1 === -1 ? 0 : foodData[foodData.length - 1].id + 1, text: '' }])
								}
							>
								<Text style={{ color: 'white', fontSize: 16 }}>Add row</Text>
							</TouchableOpacity>}
						</ScrollView>
						<View style={styles.row}>
							{!editing && (
								<>
									<TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
										<Text style={{ color: 'white', fontSize: 16 }}>Edit</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.button} onPress={pressHandler}>
										<Text style={{ color: 'white', fontSize: 16 }}>Confirm</Text>
									</TouchableOpacity>
								</>
							)}
							{editing && (
								<TouchableOpacity style={styles.button} onPress={() => setEditing(false)}>
									<Text style={{ color: 'white', fontSize: 16 }}>Done Editing</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F3F5FC',
		height: '100%',
	},
	box: {
		width: '100%',
		height: '90%',
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 15,
		gap: 15,
	},
	header: {
		height: 40,
		width: '100%',
		justifyContent: 'center',
	},
	title: {
		color: '#6DC47E',
		fontSize: 26,
		fontFamily: "JostRegular",
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
	},
	editButton: {
		backgroundColor: '#6DC47E',
		borderRadius: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
		paddingHorizontal: 40,
	},
	button: {
		backgroundColor: '#439C54',
		borderRadius: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		padding: 15,
	},
	input: {
		width: '100%',
		backgroundColor: '#E7E9F2',
		padding: 3,
		paddingLeft: 8,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 1,
		flex: 1,
		fontFamily: "JostRegular"
	},
});

export default CorrectionScreen;
