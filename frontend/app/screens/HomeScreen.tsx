import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FoodContext } from '@/contexts/FoodContext';

const data = [
	{ id: '1', text: 'Item 1' },
	{ id: '2', text: 'Item 2' },
	{ id: '3', text: 'Item 3' },
];

const HomeScreen = () => {
	const { foodItems } = useContext(FoodContext);

	const renderItem = ({ item }: { item: any }) => (
		<View style={styles.rowFront}>
			<Text>{item.text}</Text>
		</View>
	);

	const renderHiddenItem = (data: any, rowMap: any) => (
		<View style={styles.rowBack}>
			<Text style={styles.backRightBtn}>Delete</Text>
			<Text style={styles.backRightBtn}>Delete</Text>
			<Text style={styles.backRightBtn}>Delete</Text>
		</View>
	);

	return <SwipeListView data={data} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-75} />;
};

const styles = StyleSheet.create({
	rowFront: {
		backgroundColor: 'white',
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#ddd',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		padding: 20,
	},
	backRightBtn: {
		backgroundColor: 'red',
		color: 'white',
		padding: 10,
		borderRadius: 5,
	},
});

export default HomeScreen;
