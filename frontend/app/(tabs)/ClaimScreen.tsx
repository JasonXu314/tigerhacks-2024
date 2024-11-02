import { View, SafeAreaView, Text, Button, StyleSheet } from "react-native";
import MapView from 'react-native-maps';

export default function ClaimScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});