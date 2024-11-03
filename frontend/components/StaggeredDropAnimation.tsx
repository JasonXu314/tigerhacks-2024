import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Camera from './Camera';
import GroceryBag from './GroceryBag';
import Receipt from './Receipt';

const StaggeredDropAnimation: React.FC = () => {
	// Initialize animated values for each icon and text pair
	const dropAnim1 = useRef(new Animated.Value(-300)).current;
	const dropAnim2 = useRef(new Animated.Value(-300)).current;
	const dropAnim3 = useRef(new Animated.Value(-300)).current;

	useEffect(() => {
		Animated.sequence([
			Animated.timing(dropAnim1, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
				easing: Easing.elastic(1)
			}),
			Animated.timing(dropAnim2, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
				delay: 150,
				easing: Easing.elastic(1)
			}),
			Animated.timing(dropAnim3, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
				delay: 300,
				easing: Easing.elastic(1)
			})
		]).start();
	}, []);

	const iconStyles = (animation: Animated.Value) => [styles.iconContainer, { transform: [{ translateY: animation }] }];

	return (
		<View style={styles.container}>
			<Animated.View style={iconStyles(dropAnim1)}>
				<View style={[styles.group, { marginLeft: -20 }]}>
					<Text style={styles.number}>1.</Text>
					<Receipt style={{ marginLeft: -5 }}></Receipt>
				</View>
				<Text style={styles.columnText}>Shop.</Text>
			</Animated.View>
			<Animated.View style={iconStyles(dropAnim2)}>
				<View style={styles.group}>
					<Text style={styles.number}>2.</Text>
					<Camera style={{ marginLeft: -7 }}></Camera>
				</View>
				<Text style={[styles.columnText, { paddingLeft: 6 }]}>Scan.</Text>
			</Animated.View>
			<Animated.View style={iconStyles(dropAnim3)}>
				<View style={[styles.group, { marginLeft: 15 }]}>
					<Text style={styles.number}>3.</Text>
					<GroceryBag style={{ marginLeft: -11 }}></GroceryBag>
				</View>
				<Text style={styles.columnText}>Track.</Text>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	iconContainer: {
		// marginBottom: 20,
	},
	group: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginBottom: 20
	},
	number: {
		fontSize: 42,
		fontWeight: 'bold',
		marginRight: 10,
		fontFamily: 'JostSemiBold',
		marginBottom: -10
	},
	icon: {
		width: 50,
		height: 50,
		marginRight: 10
	},
	columnText: {
		fontSize: 38,
		color: '#4CAF50',
		fontFamily: 'JostRegular'
	}
});

export default StaggeredDropAnimation;

