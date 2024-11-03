import Banner from '@/components/bg/Banner';
import RecipeBanner from '@/components/bg/RecipeBanner';
import Logo from '@/components/Logo';
import StaggeredDropAnimation from '@/components/StaggeredDropAnimation';
import { useRouter } from 'expo-router';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';

const LandingPage = () => {
    const router = useRouter();
    
	return (
		<SafeAreaView style={styles.container}>
			<Banner style={{ position: 'absolute', top: 0 }}></Banner>
			<View style={{ position: 'absolute', top: '20%', alignSelf: 'center' }}>
				<Logo></Logo>
			</View>
            <StaggeredDropAnimation/>
			<View style={styles.bottomContainer}>
				<Text style={styles.description}>Just shop and scan and let us do the tracking for you!</Text>
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
