import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { FoodContext } from '@/contexts/FoodContext';

interface DataItem {
	id: string;
	text: string;
}

const data = [
	{ id: '1', text: 'Item 1' },
	{ id: '2', text: 'Item 2' },
	{ id: '3', text: 'Item 3' },
];

const HomeScreen = () => {
	// const { foodItems } = useContext(FoodContext);
	const rowRefs = useRef<Record<string, SwipeRow<DataItem>>>(null);
	const renderItem = ({ item }: { item: any }) => (
		<View style={styles.rowFront}>
			<Text>{item.text}</Text>
		</View>
	);

	const renderHiddenItem = (data: any, rowMap: any) => (
		<View style={styles.rowBack}>
			<Text style={styles.rowPublic}>Public</Text>
			<Text style={styles.rowFamily}>Family</Text>
			<Text style={styles.backRightBtn}>Delete</Text>
		</View>
	);

	const onSwipeValueChange = (swipeData: any) => {
		const { key, value } = swipeData;
		if (value < -20 && rowRefs.current) {
			// Check if rowRefs.current is not null
			rowRefs.current[key].manuallySwipeRow(-225);
		}
	};

	return (
		<SwipeListView
			data={data}
			renderItem={renderItem}
			renderHiddenItem={renderHiddenItem}
			rightOpenValue={-150}
			disableRightSwipe={true}
			// friction={10}
			// tension={10}

			tension={200} // Adjust the tension for faster snapping
            friction={10}
            previewOpenValue={-40} // Adjust the preview open value
      previewOpenDelay={300} // Adjust the preview open delay
			onSwipeValueChange={onSwipeValueChange}
			// previewRowKey={'0'}
			// previewOpenValue={-40}
			// previewOpenDelay={3000}
		/>
	);
};

const styles = StyleSheet.create({
	rowPublic: {
		backgroundColor: 'green',
		color: 'white',
		padding: 10,
		borderRadius: 5,
	},
	rowFamily: {
		backgroundColor: 'blue',
		color: 'white',
		padding: 10,
		borderRadius: 5,
	},
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
