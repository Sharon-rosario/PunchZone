// // screens/LocationPickerScreen.js
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Text,
// } from 'react-native';
// import * as Location from 'expo-location';
// import MapView, { Marker } from 'expo-maps';
// import Colors from '../constants/Colors';

// export default function LocationPickerScreen({ navigation }) {
//   const [region, setRegion] = useState(null);
//   const [marker, setMarker] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   const getCurrentLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       console.error('Permission to access location was denied');
//       return;
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     const { latitude, longitude } = location.coords;

//     const newRegion = {
//       latitude,
//       longitude,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     };
//     setRegion(newRegion);
//     setMarker(newRegion);
//   };

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       // For now, we'll just use the current region as a placeholder.
//       // You can implement a search API later if needed.
//       const newRegion = {
//         latitude: region.latitude,
//         longitude: region.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       };
//       setRegion(newRegion);
//       setMarker(newRegion);
//     } catch (error) {
//       console.error('Geocoding error:', error);
//     }
//     setLoading(false);
//   };

//   const handleSaveLocation = () => {
//     if (marker) {
//       const location = {
//         id: Date.now().toString(),
//         name: 'Office',
//         address: searchQuery || 'Custom Location',
//         latitude: marker.latitude,
//         longitude: marker.longitude,
//       };
//       navigation.navigate('Home', { selectedLocation: location });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search office address..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         onSubmitEditing={handleSearch}
//         placeholderTextColor={Colors.lightGrey}
//       />
//       {loading && <ActivityIndicator size="large" color={Colors.tintColor} />}
//       {region ? (
//         <MapView
//           style={styles.map}
//           region={region}
//           onRegionChangeComplete={setRegion}
//           onPress={(e) => setMarker(e.nativeEvent.coordinate)}
//         >
//           {marker && (
//             <Marker
//               coordinate={marker}
//               draggable
//               onDragEnd={(e) => setMarker(e.nativeEvent.coordinate)}
//             />
//           )}
//         </MapView>
//       ) : (
//         <Text style={styles.loadingText}>Loading map...</Text>
//       )}
//       <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
//         <Text style={styles.saveButtonText}>Save Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.black,
//   },
//   searchInput: {
//     backgroundColor: Colors.grey,
//     margin: 16,
//     padding: 12,
//     borderRadius: 8,
//     color: Colors.white,
//   },
//   map: {
//     flex: 1,
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//   },
//   loadingText: {
//     color: Colors.white,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   saveButton: {
//     backgroundColor: Colors.tintColor,
//     padding: 16,
//     marginHorizontal: 16,
//     borderRadius: 8,
//     position: 'absolute',
//     bottom: 30,
//     alignSelf: 'center',
//   },
//   saveButtonText: {
//     color: Colors.white,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import * as Location from 'expo-location';
// import MapView, { Marker } from 'expo-maps';

// export default function LocationPickerScreen({ navigation }) {
//   const [region, setRegion] = useState(null);

//   useEffect(() => {
//     const getLocation = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = location.coords;

//       const newRegion = {
//         latitude,
//         longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       };
//       setRegion(newRegion);
//     };

//     getLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {region ? (
//         <MapView
//           style={styles.map}
//           region={region}
//         >
//           <Marker coordinate={region} title="Your Location" />
//         </MapView>
//       ) : (
//         <Text>Loading map...</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   map: {
//     flex: 1,
//   },
// });

// screens/LocationPickerScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';

export default function LocationPickerScreen({ navigation }) {
  const mockLocation = {
    id: Date.now().toString(),
    name: 'Office HQ',
    address: 'New York, NY',
    latitude: 40.7128,
    longitude: -74.0060,
  };

  const handleSaveLocation = () => {
    navigation.navigate('Home', { selectedLocation: mockLocation });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Office Location</Text>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
        <Text style={styles.saveButtonText}>Save Mock Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: Colors.white,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: Colors.tintColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});