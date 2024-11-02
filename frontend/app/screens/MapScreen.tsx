import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MarkerData {
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
}

const MapScreen: React.FC = () => {
  const markers: MarkerData[] = [
    {
      latitude: 38.948480,
      longitude: -92.325630,
      title: 'University of Missouri Tiger Pantry',
      description: '299 Hitt St, Columbia, MO 65201',
    },
    {
      latitude: 38.953420,
      longitude: -92.335940,
      title: 'Russell Chapel Food Pantry - Food Distribution Center',
      description: '108 E Ash St, Columbia, MO 65203'
    },
    {
      latitude: 38.935450,
      longitude: -92.321760,
      title: 'Ronald McDonald House',
      description: '1110 S College Ave, Columbia, MO 65201'
    },
    {
      latitude: 38.9605627,
      longitude: -92.3441821,
      title: 'Progressive Missionary Baptist Church - Food Distribution Center',
      description: ''
    }
    // Add more markers as needed
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 38.94,
          longitude: -92.326635,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Render your markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
