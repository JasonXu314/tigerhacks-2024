import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import api from '@/services/AxiosConfig';
import * as SecureStore from 'expo-secure-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter } from 'expo-router';
import Bottom from '@/components/bg/Bottom';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

interface Props {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginScreen = ({ setIsLoggedIn }: Props) => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [value, setValue] = useState('------');
	const ref = useBlurOnFulfill({ value, cellCount: 6 });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	const [token, setToken] = useState('');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const router = useRouter();

	const handlePhoneNumButtonPress = async () => {
		if (phoneNumber.length > 0) {
			try {
				const response = await api.post('/users/signup', {
					phone: phoneNumber,
					firstName: firstName,
					lastName: lastName,
				});
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
		try {
			const response = await api.post('/users/verify', { code: '' + value }, { params: { token: token } });
			console.log(response.data);
			const verified = response.data['verified'];
			if (verified) {
				SecureStore.setItem('token', token);
				router.navigate('/HomeScreen');
			}
		} catch (error: any) {
			if (error.response.data['statusCode'] == 400) {
				Alert.alert('Incorrect code', 'The code you entered is incorrect. Please try again.');
			}
			console.error('Error posting phone number:', error.response.data);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			{showConfirmation && (
				<View style={styles.header}>
					<Ionicons
						name="chevron-back-outline"
						size={30}
						color="#6DC47E"
						onPress={() => {
							setShowConfirmation(false)
						}}
					/>
				</View>
			)}

			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }} style={{ width: '100%', padding: 40 }}>
				{showConfirmation ? (
					<>
						<View style={{ height: '70%', justifyContent: 'flex-end', gap: 30, paddingBottom: 30 }}>
							<Text style={[styles.titleText, {textAlign: 'left', marginBottom: -15}]}>Enter code</Text>
							<Text style={styles.description}>We've sent a six digit code to {phoneNumber}. Please enter it to confirm your number.</Text>
							<CodeField
								ref={ref}
								{...props}
								value={value}
								onChangeText={setValue}
								cellCount={6}
								rootStyle={styles.codeFieldRoot}
								keyboardType="number-pad"
								textContentType="oneTimeCode"
								testID="my-code-input"
								renderCell={({ index, symbol, isFocused }) => (
									<Text key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
										{symbol || (isFocused ? <Cursor /> : "-")}
									</Text>
								)}
							/>
						</View>

						<TouchableOpacity style={styles.button} onPress={handleConfirmationButtonPress}>
							<Text style={styles.buttonText}>Continue</Text>
						</TouchableOpacity>
					</>
				) : (
					<>
						<View style={{ height: '70%', justifyContent: 'flex-end', gap: 25, paddingBottom: 30 }}>
							<Text style={styles.titleText}>Welcome to Pantry</Text>
							<Text style={styles.description}>We just need a bit more information before you can start reducing food waste</Text>
							<View>
								<Text style={styles.headerText}>First Name</Text>
								<TextInput style={styles.input} onChangeText={setFirstName} placeholder="Enter your first name" autoCorrect={false} />
							</View>
							<View>
								<Text style={styles.headerText}>Last Name</Text>
								<TextInput style={styles.input} onChangeText={setLastName} placeholder="Enter your last name" autoCorrect={false} />
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
						</View>
						<TouchableOpacity style={styles.button} onPress={handlePhoneNumButtonPress}>
							<Text style={styles.buttonText}>Continue</Text>
						</TouchableOpacity>
					</>
				)}
			</KeyboardAwareScrollView>
			<Bottom style={{ position: 'absolute', bottom: 0 }}></Bottom>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#F3F5FC',
	},
	header: {
		width: '100%',
		paddingLeft: 30,
		paddingTop: 10,
	},
	input: {
		height: 40,
		backgroundColor: '#E7E9F2',
		paddingHorizontal: 10,
		borderRadius: 10,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 2,
		fontFamily: 'JostRegular',
	},
	headerText: {
		color: '#6DC47E',
		fontSize: 20,
		marginBottom: 10,
		fontFamily: 'JostRegular',
	},
	titleText: {
		color: '#6DC47E',
		fontSize: 36,
		textAlign: 'center',
		fontFamily: 'JostRegular',
	},
	description: {
		marginHorizontal: 'auto',
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
		paddingHorizontal: 40,
	},
	buttonText: {
		color: 'white',
		fontSize: 15,
		fontFamily: 'JostRegular',
	},
	root: {
		flex: 1,
		padding: 20,
	},
	title: {
		textAlign: 'center',
		fontSize: 30,
        fontFamily: 'JostRegular',
	},
	codeFieldRoot: {},
	cell: {
		width: 40,
		height: 40,
		lineHeight: 38,
		fontSize: 24,
		fontFamily: 'JostRegular',
		textAlign: 'center',
		backgroundColor: '#E7E9F2',
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 2,
	},
	focusCell: {
		borderColor: '#000',
	},
});

export default LoginScreen;
