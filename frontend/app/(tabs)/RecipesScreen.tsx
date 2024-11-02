import { View, SafeAreaView, Text, Button } from "react-native";
import { router, useLocalSearchParams, useNavigation, useRouter } from "expo-router";

const RecipesScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView>
            <Button title="aaaa" onPress={() => router.navigate({pathname: '/ClaimScreen' })}></Button>
        </SafeAreaView>
    );
}
 
export default RecipesScreen;