import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, StyleSheet, Image, Button, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import BackArrow  from '@/components/BackArrow';

const InstructionScreen = () => {
    const {data} = useLocalSearchParams();
    console.log(data);

    let dataString = Array.isArray(data) ? data.join("") : data;
    console.log(dataString.split(","))
    let temp = dataString.split(",")
    console.log(temp)
    
    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.backButton} onPress={() => router.navigate({pathname: '/RecipesScreen'})}>
                <BackArrow />
                <Text style={styles.backBtnText}>view all recipes</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.recipeTitle}>{temp[1]}</Text>
                <Image source={{ uri: temp[2]}} style={styles.recipeImage} />
                <Text style={styles.recipeHeader}>Ingredients</Text>
                <Text style={styles.recipeText}>blah blah blah</Text>
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
        padding: 40,
    }
  });

export default InstructionScreen;
