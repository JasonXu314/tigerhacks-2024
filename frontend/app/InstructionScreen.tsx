import Loader from '@/components/Loader';
import Banner from '@/components/bg/Banner';
import api from '@/services/AxiosConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const InstructionScreen = () => {
	const [recipeInstructions, setRecipeInstructions] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [init, setInit] = useState(true);

	const { data } = useLocalSearchParams();
	let dataString = Array.isArray(data) ? data.join('') : data;
	let temp = dataString.split(',');

	useEffect(() => {
		requestRecipeDetails();
	}, []);

	const requestRecipeDetails = async () => {
		try {
			const token = SecureStore.getItem('token');
			const response = await api.get('/recipe-details', {
				params: {
					token: token,
					id: temp[0]
				}
			});
			setRecipeInstructions(response.data.analyzedInstructions[0].steps);
			setIngredients(response.data.extendedIngredients);
			setInit(false);
		} catch (error: any) {
			console.error('Error fetching recipes:', error.response.data);
		}
	};

	if (init) {
		return <Loader />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<Banner style={{ position: 'absolute', top: -150, zIndex: 5 }}></Banner>
			<View style={styles.header}>
				<Ionicons
					name="chevron-back-outline"
					size={30}
					color="#fff"
					style={{ zIndex: 10 }}
					onPress={() => {
						if (router.canGoBack()) {
							router.back();
						}
					}}
				/>
			</View>
			<Text style={styles.recipeTitle}>{temp[1]}</Text>
			<ScrollView>
				<Image source={{ uri: temp[2] }} style={styles.recipeImage} />
				<Text style={styles.recipeHeader}>Ingredients</Text>
				{ingredients.map((ingredient: any, i) => (
					<Text style={styles.recipeText} key={i}>
						{'\u2022'} {ingredient.original}
					</Text>
				))}

				<Text style={styles.recipeHeader}>Directions</Text>
				{recipeInstructions.map((recipeInstruction: any, i) => (
					<Text style={styles.recipeText} key={i}>
						{i + 1}. {recipeInstruction.step}
					</Text>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		width: '100%',
		paddingLeft: 25,
		paddingTop: 10,
		zIndex: 10
	},
	recipeTitle: {
		fontSize: 26,
		padding: 5,
		alignSelf: 'center',
		fontFamily: 'JostSemiBold',
		color: '#fff',
		zIndex: 10,
		textAlign: 'center'
	},
	recipeHeader: {
		fontSize: 32,
		color: '#6DC47E',
		paddingTop: 15,
		paddingBottom: 10,
		paddingLeft: 30,
		fontFamily: 'JostRegular'
	},
	recipeText: {
		fontSize: 14,
		fontFamily: 'JostRegular',
		paddingLeft: 50,
		paddingRight: 20,
		color: '5E5E5E'
	},
	recipeImage: {
		width: 500,
		height: 250,
		alignSelf: 'center'
	},
	backBtnText: {
		color: '#439C54'
	},
	backButton: {
		paddingLeft: 20,
		paddingTop: 45
	},
	backArrowContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});

export default InstructionScreen;

