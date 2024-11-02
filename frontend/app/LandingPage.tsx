import Banner from '@/components/bg/Banner';
import { useRouter } from 'expo-router';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const LandingPage = () => {
    const router = useRouter();
    
	return (
		<SafeAreaView style={styles.container}>
			<Banner style={{ position: 'absolute', top: 0 }}></Banner>
			<View style={{ position: 'absolute', top: '25%', alignSelf: 'center' }}>
				<Text>PantryPal</Text>
				{/* logo */}
			</View>
			<View style={styles.bottomContainer}>
				<Text style={styles.headerText}>Start reducing waste today!</Text>
				<Text style={styles.description}>Reduce food waste by keeping track of your food's expiration dates</Text>
				<TouchableOpacity style={styles.button} onPress={() => router.navigate('/LoginScreen')}>
					<Text style={styles.buttonText}>Get started</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F3F5FC',
		height: '100%',
		width: '100%',
	},
	bottomContainer: {
		height: '50%',
		marginTop: 'auto',
		display: 'flex',
		paddingHorizontal: 20,
		justifyContent: 'flex-end',
		gap: 25,
		paddingBottom: 20,
	},
	headerText: {
		color: '#6DC47E',
		fontSize: 36,
		fontFamily: 'JostRegular',
	},
	description: {
		fontFamily: 'JostRegular',
		fontSize: 16,
	},
	button: {
		backgroundColor: '#6DC47E',
		borderRadius: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
		width: '100%',
	},
	buttonText: {
		fontFamily: 'JostRegular',
		color: 'white',
		fontSize: 20,
	},
});

export default LandingPage;
