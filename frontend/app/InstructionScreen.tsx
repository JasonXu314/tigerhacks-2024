import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, StyleSheet, Image, Button, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import BackArrow  from '@/components/BackArrow';
import * as SecureStore from 'expo-secure-store';
import api from '@/services/AxiosConfig';
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const InstructionScreen = () => {
    const [recipeInstructions, setRecipeInstructions] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [init, setInit] = useState(true);

    const {data} = useLocalSearchParams();
    let dataString = Array.isArray(data) ? data.join("") : data;
    let temp = dataString.split(",")
   
    useEffect(() => {
        requestRecipeDetails();
      }, []);

    const requestRecipeDetails = async () => {
        try {
            const token = await SecureStore.getItem('token');
            const response = await api.get('/recipe-details', {
                params: {
                    token: token,
                    id: temp[0]
                }
            });
            setRecipeInstructions(response.data.analyzedInstructions[0].steps);
            setIngredients(response.data.extendedIngredients);
            console.log(recipeInstructions);
            setInit(false);
        } catch (error: any) {
            console.error('Error fetching recipes:', error.response.data)
        }
    };

    if (init) {
        return <Loader/>
    }
    
    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.backButton} onPress={() => router.navigate({pathname: '/RecipesScreen'})}>
                <View style={styles.backArrowContainer}>
                <BackArrow />
                <Text style={styles.backBtnText}>view all recipes</Text>
                </View>
            </TouchableOpacity>
            <View>
                <Text style={styles.recipeTitle}>{temp[1]}</Text>
                <Image source={{ uri: temp[2]}} style={styles.recipeImage} />
                <Text style={styles.recipeHeader}>Ingredients</Text>
                {/* Ingredients go here */}
                {ingredients.map((ingredient: any, i) => (
                    <Text style={styles.recipeText} key={i}>{"\u2022"} {ingredient.original}</Text>
                ))}
                
                <Text style={styles.recipeHeader}>Directions</Text>
                {recipeInstructions.map((recipeInstruction: any, i) => (
                    <Text style={styles.recipeText} key={i}>{"\u2022"} {recipeInstruction.step}</Text>
                ))}
            </View>
        </SafeAreaView>
    );
}
 
const styles = StyleSheet.create({
    recipeTitle: {
        fontSize: 36,
        padding: 30,
    },
    recipeHeader: {
        fontSize: 36,
        color: "#6DC47E",
        padding: 30,
    },
    recipeText: {
        fontSize: 14,
        paddingLeft: 55,
    },
    recipeImage: {
        width: 200,
        height: 150,
        alignSelf: 'center'
    },
    backBtnText: {
        color: "#439C54"
    },
    backButton: {
        paddingLeft: 20,
        paddingTop: 45,
    },
    backArrowContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
  });

export default InstructionScreen;
