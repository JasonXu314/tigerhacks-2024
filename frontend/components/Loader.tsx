import { SafeAreaView, ActivityIndicator } from "react-native";

const Loader = () => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={"large"} color="#6DC47E" />
        </SafeAreaView>
    );
}
 
export default Loader;
