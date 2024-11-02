import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import BackArrow from '@/components/BackArrow';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FoodContext } from '@/contexts/FoodContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '@/services/AxiosConfig';
import * as SecureStorage from 'expo-secure-store';
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
		api.post(`/add-food?token=${SecureStorage.getItem('token')}`, {
			names: foods,
		})
			.then((resp) => {
				console.log(resp.data);
				updateFoodItems(resp.data);
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
									{!editing && <Text>{obj.text}</Text>}
									{editing && (
										<View style={{ display: 'flex', flexDirection: 'row', gap: 10, width: '100%' }}>
											<TextInput
												onChangeText={(e) => {
													let temp = foodData;
													const idx = temp.findIndex((ob: Scan) => ob.id === obj.id);
													if (idx > -1) {
														temp[idx] = e.toUpperCase();
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
	},
});

export default CorrectionScreen;
