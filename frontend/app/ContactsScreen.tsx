import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Contact from '@/components/Contact';
import * as Contacts from 'expo-contacts';
import BackArrow from '@/components/BackArrow';
import { SearchBar } from '@rneui/themed';
import * as SecureStorage from 'expo-secure-store'
import { router, useLocalSearchParams } from 'expo-router';
import api from '@/services/AxiosConfig';

const ContactsScreen = () => {
    const { id } = useLocalSearchParams();
	const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
	const [tempContacts, setTempContacts] = useState<Contacts.Contact[]>([]);
    const [searchValue, setSearchValue] = useState('')
    const [selectedContacts, setSelectedContacts] = useState<string[]>([])

	useEffect(() => {
		(async () => {
			const { status } = await Contacts.requestPermissionsAsync();
			if (status === 'granted') {
				const { data } = await Contacts.getContactsAsync({
					fields: [Contacts.Fields.PhoneNumbers],
				});
				if (data.length > 0) {
					setContacts(data);
                    setTempContacts(data);
                    let temp = SecureStorage.getItem('contacts');
                    if (temp) {
                        setSelectedContacts(JSON.parse(temp))
                    }
				}
			}
		})();
	}, []);
	const keyExtractor = (item: any, idx: number) => {
		return item?.id?.toString() || idx.toString();
	};
	const renderItem = ({ item, index }: { item: any; index: number }) => {
		return <Contact contact={item} selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts} />;
	};

    const continueHandler = () => {
        SecureStorage.setItem('contacts', JSON.stringify(selectedContacts));
        api.post(`/alert-contacts?token=${SecureStorage.getItem('token')}`, {
            phones: selectedContacts,
            foodId: id,
        })
        .then((resp) => {
            console.log(resp.data)
        })
        .catch((err) => {
            console.log(err)
        })
        router.back();
        Alert.alert('The contacts you selected have been notified!')
    }

	return (
		<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<BackArrow></BackArrow>
					<View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontFamily: 'JostRegular', fontSize: 18 }}>Contacts</Text>
					</View>
				</View>
				<SearchBar
					lightTheme
					round
                    autoCorrect={false}
					containerStyle={styles.search}
					inputContainerStyle={{ backgroundColor: 'white' }}
					placeholder="Search"
					inputStyle={{ fontSize: 15, fontFamily: 'JostRegular' }}
                    onChangeText={(val) => {
                        setContacts([...tempContacts.filter(contact => contact.firstName?.startsWith(val))]);
                        setSearchValue(val);
                      }}
                      value={searchValue}
				/>
				<FlatList data={contacts} renderItem={renderItem} keyExtractor={keyExtractor} style={styles.list} />
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    {selectedContacts.length > 0 && <Text style={styles.selectedText}>
                        {selectedContacts.length} contacts selected
                    </Text>}
                    <TouchableOpacity style={styles.button} onPress={() => continueHandler()}>
                        <Text style={{color: 'white', fontFamily: 'JostRegular', fontSize: 16}}>Continue</Text>
                    </TouchableOpacity>
                </View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
        gap: 15,
	},
	header: {
		width: '100%',
		paddingHorizontal: 20,
		flexDirection: 'row',
	},
	search: {
		backgroundColor: 'transparent',
		borderBottomWidth: 0,
		borderTopWidth: 0,
		marginHorizontal: 10,
	},
	list: {
		flex: 1,
	},
    button: {
        width: '90%',
        padding: 15,
        backgroundColor: '#5BB46C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 20,
    },
    selectedText: {
        fontFamily: "JostRegular",
        fontSize: 15,
        paddingBottom: 10,
        color: '#5BB46C'
    }
});
export default ContactsScreen;
