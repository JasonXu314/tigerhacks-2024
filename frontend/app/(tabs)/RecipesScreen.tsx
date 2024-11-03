import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import api from '@/services/AxiosConfig';
import * as SecureStore from 'expo-secure-store';

const RecipesScreen = () => {
    const [recipes, setRecipes] = useState([]);

    console.log(SecureStore.getItem('token'))

    const handlePress = async () => {
        try {
          const token = await SecureStore.getItem('token'); // Get the token first
          const response = await api.get('/recipes', {
            params: { 
              token: token
            }
          });
          setRecipes(response.data);
          console.log(response.data);

        } catch (error: any) {
          console.error('Error fetching recipes:', error.response.data);
        }
      };

    const handlePressDetails = async () => {
        try {
            const token = await SecureStore.getItem('token');
            const response = await api.get('/recipe-details', {
                params: {
                    token: token,
                    id: 652929
            }
        });
        // console.log(response.data);
        } catch (error: any) {
            console.error('Error fetching recipes:', error.response.data)
        }
    };

      const renderItem = ({ item } : {item: any}) => (
        <View style={styles.recipeItem}>
          <TouchableOpacity onPress={() => router.navigate({pathname: '/InstructionScreen', params: {data: [ item.id, item.title, item.image]}})}> 
          <Image source={{ uri: item.image }} style={styles.recipeImage} />
          <Text style={styles.recipeTitle}>{item.title}</Text>
          </TouchableOpacity>
        </View> 
    
      );

	return (
        <SafeAreaView>
            <Button title="test api" onPress={handlePress} />
            <Button title='test /recipe-details' onPress={handlePressDetails} />
            <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.ListContent}
      />
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    recipeItem: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        borderWidth: 1, 
        borderColor: "#ccc", 
        borderRadius: 5, 
        overflow: "hidden",
    },
    recipeImage: {
      width: 200,
      height: 150,
    },
    recipeTitle: {
      marginTop: 5,
      width: 200,
      textAlign: 'center',
      padding: 15
    },
    ListContent: {
        paddingTop: 10,
        paddingBottom: 175,
        paddingRight: 10,
        paddingLeft: 10
    }
  });
  
export default RecipesScreen;

