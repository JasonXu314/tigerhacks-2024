import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, StyleSheet, Image, Button, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import BackArrow  from '@/components/BackArrow';
import * as SecureStore from 'expo-secure-store';
import api from '@/services/AxiosConfig';
import { useEffect, useState } from "react";

const InstructionScreen = () => {

    const [recipeDetails, setRecipeDetails] = useState("")
    

    const {data} = useLocalSearchParams();
    // console.log(data);

    let dataString = Array.isArray(data) ? data.join("") : data;
    // console.log(dataString.split(","))
    let temp = dataString.split(",")
    // console.log(temp)

    let ingredients: any[] = [];
    const requestRecipeDetails = async () => {
        try {
            const token = await SecureStore.getItem('token');
            const response = await api.get('/recipe-details', {
                params: {
                    token: token,
                    id: temp[0]
            }
        });
        // console.log(response.data);
        
        ingredients = response.data.extendedIngredients
        // console.log(response.data.analyzedInstructions[0].steps[0].ingredients)
        console.log(ingredients[0].original)
        // setRecipeDetails(response.data)
        
        } catch (error: any) {
            console.error('Error fetching recipes:', error.response.data)
        }
    };
    
    useEffect(() => { // Use useEffect to call handlePressDetails only once
        requestRecipeDetails();
      }, []);

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
                {ingredients.map((ingredient) => ( // Map through the ingredients array
          <Text key={ingredient.id} style={styles.recipeText}>
            {ingredient.original}
          </Text>
          ))}
                <Text style={styles.recipeHeader}>Directions</Text>
                <Text style={styles.recipeText}>blah blah</Text>
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
