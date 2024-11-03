import React from 'react';
import { View, StyleSheet, Platform, Linking, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

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
      description: '702 Banks Ave, Columbia, MO 65203'
    }
  ];

  const openMapDirections = (latitude: number, longitude: number) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label   
 = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url!);

  };

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
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}   

            description={marker.description}   

            onCalloutPress={() => {
              if (Platform.OS === 'ios') {
                const url = `maps://app?daddr=${marker.latitude},${marker.longitude}`;
                Linking.openURL(url);
              } else {
                openMapDirections(marker.latitude, marker.longitude);
              }
            }}
          >
            <Callout>
           <View>
               <Text style={styles.markerTitleText}>{marker.title}</Text>
               <Text style={styles.markerDescText}>{marker.description}</Text>
           </View>
       </Callout>
          </Marker>
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
  markerTitleText: {
    fontFamily: "JostRegular",
    fontWeight: "bold",
  },
  markerDescText: {
    fontFamily: "JostRegular",
  }
});

export default MapScreen;
