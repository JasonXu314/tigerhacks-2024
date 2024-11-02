import { View, SafeAreaView, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import MapView from 'react-native-maps';
import * as SecureStore from 'expo-secure-store'

export default function ClaimScreen() {
  return (
    <SafeAreaView>
        <TouchableOpacity onPress={() => {SecureStore.deleteItemAsync('token')}}><Text>clear storage</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});