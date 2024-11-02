import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import HomeScreen from '@/app/screens/HomeScreen';
import RecipesScreen from '@/app/screens/RecipesScreen';
import ClaimScreen from '@/app/screens/ClaimScreen';
import MapScreen from '@/app/screens/MapScreen';

const Tab = createBottomTabNavigator();

interface Props {
    onPress?: any
}

function CustomTabBarButton({ onPress }: Props) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
  
    if (!permission) {
      return <View />;
    }
  
    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
      }
    
      return (
        <View style={styles.container}>
          <CameraView style={styles.camera} facing={facing}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      );

    // return (
    //     <TouchableOpacity
    //       style={{
    //         top: -15,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         ...styles2.shadow,
    //       }}
    //       onPress={openCamera}
    //     >
    //       <View
    //         style={{
    //           width: 60,
    //           height: 60,
    //           borderRadius: 30,
    //           backgroundColor: '#e32f45',
    //         }}
    //       >
    //         <Icon name="camera-outline" color="#fff" size={28} />
    //       </View>
    //     </TouchableOpacity>
    //   );
}

const Navbar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles2.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="home-outline" color={focused ? '#e32f45' : '#748c94'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="notifications-outline" color={focused ? '#e32f45' : '#748c94'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={() => null} // No actual screen, just the button
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Claim"
        component={ClaimScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="person-outline" color={focused ? '#e32f45' : '#748c94'} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="settings-outline" color={focused ? '#e32f45' : '#748c94'} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles2 = {
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });
 
export default Navbar;