import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import api from '@/services/AxiosConfig';
import * as SecureStore from 'expo-secure-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import HomeScreen from '@/app/(tabs)/HomeScreen';
import { useRouter } from 'expo-router';

interface Props {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginScreen = ({ setIsLoggedIn }: Props) => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showNameInput, setShowNameInput] = useState(false);
	// const [nameInput, setNameInput] = useState("");
	const [confirmationNumber, setConfirmationNumber] = useState('');
	const [showHomeScreen, setShowHomeScreen] = useState(false);
	const [token, setToken] = useState('');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const router = useRouter();

	const handleInputChange = (text: string) => {
		setPhoneNumber(text);
	};

	const handlePhoneNumButtonPress = async () => {
		if (phoneNumber.length > 0) {
			try {
				const response = await api.post('/users/signup', {
					phone: phoneNumber,
					firstName: firstName,
					lastName: lastName,
				});
				console.log(response.data);
				console.log(response.data['token']);
				setToken(response.data['token']);

				setShowConfirmation(true);
			} catch (error: any) {
				if (error.response.data['statusCode'] == 400) {
					setShowConfirmation(true);
				}
				console.error('Error posting phone number:', error.response.data);
			}
		} else {
			alert('Invalid phone number or name.');
		}
	};

	const handleConfirmationButtonPress = async () => {
		let res = {
			code: '' + confirmationNumber,
		};
		try {
			const response = await api.post('/users/verify', { code: '' + confirmationNumber }, { params: { token: token } });
			console.log(response.data);
			const verified = response.data['verified'];
			if (verified) {
				SecureStore.setItem('token', token);
				router.navigate('/HomeScreen');
			}
		} catch (error: any) {
			// console.log(error.response.data['statusCode'])
			if (error.response.data['statusCode'] == 400) {
				Alert.alert('Incorrect code', 'The code you entered is incorrect. Please try again.');
			}
			console.error('Error posting phone number:', error.response.data);
		}
		// if (confirmationNumber.length > 0) {
		//     setShowNameInput(true);
		// } else {
		//     alert("Invalid confirmation code.");
		// }
	};

	const handleNameButtonPress = async () => {
		setShowHomeScreen(true);
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }} style={{ width: '100%', padding: 40 }}>
				{showConfirmation ? (
					<View>
						<Text style={styles.titleText}></Text>
						<Text style={styles.normalText}>We've sent a six digit code to {phoneNumber}. Please enter it to confirm your number</Text>
						<TextInput
							style={styles.input}
							// onChangeText={setConfirmationNumber}
							onChangeText={(text) => {
								const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
								if (numericText.length <= 6) {
									setConfirmationNumber(numericText);
								}
							}}
							value={confirmationNumber}
							placeholder="Confirmation number"
							keyboardType="numeric"
							maxLength={6}
						/>
						<Button title="Next" onPress={handleConfirmationButtonPress} />
					</View>
				) : (
					<View>
						<Text style={styles.titleText}>Welcome to Pantry</Text>
						<Text style={styles.normalText}>We just need a bit more information before you can start reducing food waste</Text>
						<View>
							<Text style={styles.headerText}>First Name</Text>
							<TextInput style={styles.input} onChangeText={setFirstName} placeholder="Enter your first name" />
						</View>
						<View>
							<Text style={styles.headerText}>Last Name</Text>
							<TextInput style={styles.input} onChangeText={setLastName} placeholder="Enter your last name" />
						</View>
						<View>
							<Text style={styles.headerText}>Phone Number</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) => {
									const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
									if (numericText.length <= 10) {
										setPhoneNumber(numericText);
									}
								}}
								value={phoneNumber}
								placeholder="Enter your phone number"
								keyboardType="numeric"
								maxLength={10}
							/>
						</View>
						<TouchableOpacity style={styles.button} onPress={handlePhoneNumButtonPress}><Text style={styles.buttonText}>Continue</Text></TouchableOpacity>
					</View>
				)}
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#F3F5FC',
	},
	input: {
		height: 40,
		backgroundColor: '#E7E9F2',
		marginBottom: 25,
		paddingHorizontal: 10,
		borderRadius: 10,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 2,
	},
	headerText: {
		color: '#6DC47E',
		fontSize: 20,
		marginBottom: 10,
	},
	titleText: {
		color: '#6DC47E',
		fontSize: 36,
		textAlign: 'center',
		paddingBottom: 10,
	},
	normalText: {
		fontSize: 14,
		paddingBottom: 60,
		paddingTop: 20,
        marginHorizontal: 'auto'
	},
    button: {
		backgroundColor: '#6DC47E',
		borderRadius: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
		paddingHorizontal: 40,
	},
    buttonText: {
        color: 'white',
        fontSize: 15,
    }
});

export default LoginScreen;
