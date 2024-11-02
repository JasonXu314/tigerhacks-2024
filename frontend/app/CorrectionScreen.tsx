import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import BackArrow from '@/components/BackArrow';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FoodContext } from '@/contexts/FoodContext';

const CorrectionScreen = () => {
	const { data } : { data: string[] } = useLocalSearchParams();
    const router = useRouter();
    const { updateFoodItems } = useContext(FoodContext);
    const [foodData, setFoodData] = useState(data);

	const pressHandler = () => {
        updateFoodItems([]);
        router.back()
    };

	return (
		<SafeAreaView>
			<BackArrow></BackArrow>
			<Text>Does this look correct?</Text>
			{foodData.map((word) => (
				<Text>{word}</Text>
			))}
			<TouchableOpacity style={styles.button} onPress={pressHandler}>
				<Text>Looks good!</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#6DC47E',
	},
});

export default CorrectionScreen;
