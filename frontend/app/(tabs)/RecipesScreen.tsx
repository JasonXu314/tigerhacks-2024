import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import api from '@/services/AxiosConfig';
import * as SecureStore from 'expo-secure-store';
import Book from '@/components/bg/Book';
import { SearchBar } from '@rneui/themed';
import Loader from '@/components/Loader';

const RecipesScreen = () => {
	const [recipes, setRecipes] = useState([]);
	const [tempRecipes, setTempRecipes] = useState([]);
	const [searchValue, setSearchValue] = useState('');
    const [init, setInit] = useState(true);

	useEffect(() => {
		handlePress();
	}, []);

	const handlePress = async () => {
		try {
			const token = await SecureStore.getItem('token'); // Get the token first
			const response = await api.get('/recipes', {
				params: {
					token: token,
				},
			});
			setRecipes(response.data);
			setTempRecipes(response.data);
            setInit(false);
		} catch (error: any) {
			console.error('Error fetching recipes:', error.response.data);
		}
	};

	const renderItem = ({ item }: { item: any }) => (
		<TouchableOpacity
			onPress={() => router.navigate({ pathname: '/InstructionScreen', params: { data: [item.id, item.title, item.image] } })}
			style={styles.recipeItem}
		>
			<Image source={{ uri: item.image }} style={styles.recipeImage} />
			<Text style={styles.recipeTitle} numberOfLines={2}>{item.title}</Text>
		</TouchableOpacity>
	);

    if (init) return <Loader/>

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
					setTempRecipes([...recipes.filter((recipe: any) => recipe.title?.startsWith(val))]);
					setSearchValue(val);
				}}
				value={searchValue}
			/>
			{recipes.length > 0 && (
				<FlatList
					data={tempRecipes}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
					numColumns={2}
				/>
			)}
			{recipes.length === 0 && (
				<View style={{ height: '85%', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
					<Book style={{ marginTop: -30, marginBottom: 30 }}></Book>
					<Text style={{ color: '#606C38', fontFamily: 'JostRegular', fontSize: 15 }}>Your recipe book is empty...</Text>
					<Text style={{ color: '#606C38', fontFamily: 'JostRegular', fontSize: 15 }}>Add food to your pantry first to get recipe suggestions!</Text>
				</View>
			)}
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	search: {
		backgroundColor: 'white',
		borderBottomWidth: 0,
		borderTopWidth: 0,
	},
	recipeItem: {
		alignItems: 'center',
		margin: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		overflow: 'hidden',
        maxWidth: '50%',
        flex: 1
	},
	recipeImage: {
		width: 200,
		height: 150,
	},
	recipeTitle: {
		textAlign: 'center',
		padding: 10,
	},
});

export default RecipesScreen;