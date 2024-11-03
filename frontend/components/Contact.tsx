import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Contact = ({ contact, selectedContacts, setSelectedContacts }: { contact: any; selectedContacts: any; setSelectedContacts: any }) => {
	const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (contact?.phoneNumbers && selectedContacts.includes(contact.phoneNumbers[0].number)) {
            setSelected(true);
        }
    })

    const pressHandler = () => {
        if (!contact?.phoneNumbers) {
            return;
        }
        if (selected) { // remove
            setSelectedContacts([...selectedContacts.filter((phone: string) => phone != contact.phoneNumbers[0].number)])
        }
        else { // add
            setSelectedContacts([...selectedContacts, contact.phoneNumbers[0].number])
        }
        console.log(selectedContacts)
        setSelected(!selected)
    }

	return (
		<TouchableOpacity style={styles.contactCon} onPress={() => pressHandler()}>
			<View style={styles.imgCon}>
				<View style={styles.placeholder}>
					<Text style={styles.txt}>{contact?.name[0]}</Text>
				</View>
			</View>
			<View style={styles.contactDat}>
				<Text style={styles.name}>{contact?.name}</Text>
				<Text style={styles.phoneNumber}>{contact?.phoneNumbers ? contact?.phoneNumbers[0]?.number : null}</Text>
			</View>
          {selected && <Icon name="checkmark" size={24} color={'#5BB46C'} style={{alignSelf: 'center', marginRight: 10}}/>}
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	contactCon: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		paddingLeft: 25,
		borderBottomWidth: 0.5,
		borderBottomColor: '#d9d9d9',
		gap: 8,
	},
	imgCon: {},
	placeholder: {
		width: 55,
		height: 55,
		borderRadius: 30,
		overflow: 'hidden',
		backgroundColor: '#d9d9d9',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contactDat: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 5,
	},
	txt: {
		fontSize: 18,
	},
	name: {
		fontSize: 16,
	},
	phoneNumber: {
		color: '#888',
	},
});
export default Contact;
