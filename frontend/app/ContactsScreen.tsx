import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Contact from '@/components/Contact';
import * as Contacts from 'expo-contacts';

const ContactsScreen = () => {
	const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
	useEffect(() => {
		(async () => {
			const { status } = await Contacts.requestPermissionsAsync();
			if (status === 'granted') {
				const { data } = await Contacts.getContactsAsync({
					fields: [Contacts.Fields.PhoneNumbers],
				});
				if (data.length > 0) {
					setContacts(data);
					console.log(data[0]);
				}
			}
		})();
	}, []);
	const keyExtractor = (item: any, idx: number) => {
		return item?.id?.toString() || idx.toString();
	};
	const renderItem = ({ item, index }: {item: any, index: number}) => {
		return <Contact contact={item} />;
	};
	return <FlatList data={contacts} renderItem={renderItem} keyExtractor={keyExtractor} style={styles.list} />;
};
const styles = StyleSheet.create({
	list: {
		flex: 1,
	},
});
export default ContactsScreen;
