import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FoodContext } from '@/contexts/FoodContext';
import BackArrow from '@/components/BackArrow';
import { useLocalSearchParams } from 'expo-router';

const CorrectionScreen = () => {
    const { data }: {data: string[]} = useLocalSearchParams();

    return (
        <SafeAreaView>
            <BackArrow></BackArrow>
            <Text>Does this look correct?</Text>
            {data.map((word) => (
                <Text>{word}</Text>
            ))}
        </SafeAreaView>
    );
}
 
export default CorrectionScreen;