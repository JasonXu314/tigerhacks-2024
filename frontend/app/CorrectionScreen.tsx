import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FoodContext } from '@/contexts/FoodContext';
import BackArrow from '@/components/BackArrow';
import { useLocalSearchParams } from 'expo-router';

const CorrectionScreen = () => {
	const { data } : { data: string[] } = useLocalSearchParams();

	const pressHandler = () => {
        
    };

	return (
		<SafeAreaView>
			<BackArrow></BackArrow>
			<Text>Does this look correct?</Text>
			{data.map((word) => (
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
