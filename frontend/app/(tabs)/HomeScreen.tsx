import React, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { FoodContext } from '@/contexts/FoodContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface DataItem {
	id: string;
	text: string;
}

const HomeScreen = () => {
	const { foodItems } = useContext(FoodContext);
    const [foodData, setFoodData] = useState(foodItems)
    console.log(foodItems)

	const rowRefs = useRef<Record<string, SwipeRow<DataItem>>>(null);
	const renderItem = ({ item }: { item: any }) => (
		<View style={styles.rowFront}>
			<Text>{item.text}</Text>
		</View>
	);

	const renderHiddenItem = (data: any, rowMap: any) => (
		<View style={styles.rowBack}>
            <TouchableOpacity style={[styles.box, {backgroundColor: '#439C54'}]}>
                <Icon name="globe-outline" color="#fff" size={20} />
                <Text style={styles.boxText}>Public</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.box, {backgroundColor: '#5BB46C'}]}>
                <Icon name="person-outline" color="#fff" size={20} />
                <Text style={styles.boxText}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.box, {backgroundColor: '#FF4848'}]} onPress={() => {}}>
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

	return (
		<SwipeListView
			data={foodData}
			renderItem={renderItem}
			renderHiddenItem={renderHiddenItem}
			rightOpenValue={-225}
			disableRightSwipe={true}
			tension={200}
			friction={10}
			previewOpenValue={-40}
			previewOpenDelay={300}
			onSwipeValueChange={onSwipeValueChange}
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
    },
	rowFront: {
		backgroundColor: 'white',
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
	},
});

export default HomeScreen;
