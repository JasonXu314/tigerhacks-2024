import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

const BackArrow = () => (
	<Ionicons
		name="chevron-back-outline"
		size={30}
		color="#6DC47E"
		style={styles.backArrow}
		onPress={() => {
			if (router.canGoBack()) {
				router.back();
			}
		}}
	/>
);

const styles = StyleSheet.create({
	backArrow: {
		zIndex: 10
	}
});

export default BackArrow;
