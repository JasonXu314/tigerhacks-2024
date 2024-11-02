import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "@/app/(tabs)/HomeScreen";
import Navbar from "@/components/Navbar";

interface Props {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginScreen = ({setIsLoggedIn} : Props) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [confirmationNumber, setConfirmationNumber] = useState("");
    const [showHomeScreen, setShowHomeScreen] = useState(false);

    const handleInputChange = (text: string) => {
        setPhoneNumber(text);
    };

    const handlePhoneNumButtonPress = () => {
        if (phoneNumber.length > 0) {
            setShowConfirmation(true);
        } else {
            alert("Please enter a phone number.");
        }
    };

    const handleConfirmationButtonPress = () => {
        if (confirmationNumber.length > 0) {
            setShowNameInput(true);
        } else {
            alert("Invalid confirmation code.");
        }
    };

    const handleNameButtonPress = () => {
        setShowHomeScreen(true);
    };

    return (
        <View style={styles.container}>
        {showHomeScreen ? ( 
            <Navbar /> 
        ) : showNameInput ? (
            <View>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
            />
            <Button title="Confirm" onPress={handleNameButtonPress} /> 
            </View>
        ) : showConfirmation ? (
            <View>
            <Text>We sent a 6-digit confirmation code to: {phoneNumber}</Text>
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
            <TextInput
                style={styles.input}
                // onChangeText={handleInputChange}
                onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                    if (numericText.length <= 10) {
                      setPhoneNumber(numericText);
                    }
                  }}
                value={phoneNumber}
                placeholder="Phone Number"
                keyboardType="numeric"
                maxLength={10}
            />
            <Button title="Next" onPress={handlePhoneNumButtonPress} />
            </View>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
