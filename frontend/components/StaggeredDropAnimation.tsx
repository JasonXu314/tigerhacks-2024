import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import GroceryBag from './GroceryBag';
import Camera from './Camera';
import Receipt from './Receipt';

const StaggeredDropAnimation: React.FC = () => {
  // Initialize animated values for each icon and text pair
  const dropAnim1 = useRef(new Animated.Value(-100)).current;
  const dropAnim2 = useRef(new Animated.Value(-100)).current;
  const dropAnim3 = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    // Start animations with staggered delay for each column
    Animated.sequence([
      Animated.timing(dropAnim1, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(dropAnim2, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        delay: 200,
      }),
      Animated.timing(dropAnim3, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        delay: 400,
      }),
    ]).start();
  }, []);

  const iconStyles = (animation: Animated.Value) => [
    styles.iconContainer,
    { transform: [{ translateY: animation }] }
  ];

  return (
    <View style={styles.container}>
      {/* First Group: "Shop" */}
      <Animated.View style={iconStyles(dropAnim1)}>
        <View style={styles.group}>
          <Text style={styles.number}>1.</Text>
          <Receipt></Receipt>
        </View>
          <Text style={styles.columnText}>Shop.</Text>
      </Animated.View>

      {/* Second Group: "Scan" */}
      <Animated.View style={iconStyles(dropAnim2)}>
        <View style={styles.group}>
          <Text style={styles.number}>2.</Text>
          <Camera></Camera>
        </View>
          <Text style={styles.columnText}>Scan</Text>
      </Animated.View>

      {/* Third Group: "Track" */}
      <Animated.View style={iconStyles(dropAnim3)}>
        <View style={styles.group}>
          <Text style={styles.number}>3.</Text>
          <GroceryBag></GroceryBag>
        </View>
          <Text style={styles.columnText}>Track</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  iconContainer: {
    // marginBottom: 20,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  number: {
    fontSize: 42,
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: 'JostRegular',
    backgroundColor: 'blue',
    marginBottom: -10
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  columnText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4CAF50',
    fontFamily: 'JostRegular'
  },
});

export default StaggeredDropAnimation;
