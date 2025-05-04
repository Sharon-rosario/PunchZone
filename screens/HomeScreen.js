// screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import { dummyLocations } from '../data/locations';

export default function HomeScreen({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [punchStatus, setPunchStatus] = useState('Out');

  // Update selected location when coming back from picker
  if (route.params?.selectedLocation) {
    setSelectedLocation(route.params.selectedLocation);
    route.params.selectedLocation = null; // Reset to prevent re-trigger
  }

  const handleManualPunch = () => {
    const newStatus = punchStatus === 'In' ? 'Out' : 'In';
    setPunchStatus(newStatus);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />

      {/* Top App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.greeting}>Hi, User!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Selected Location Banner */}
      {selectedLocation && (
        <View style={styles.selectedLocation}>
          <View>
            <Text style={styles.selectedLocationText}>{selectedLocation.name}</Text>
            <Text style={styles.selectedLocationAddress}>{selectedLocation.address}</Text>
          </View>
          <Pressable style={styles.changeButton} onPress={() => navigation.navigate('LocationPickerScreen')}>
            <Text style={styles.changeButtonText}>Change</Text>
          </Pressable>
        </View>
      )}

      {/* Punch Status Section */}
      <View style={styles.punchStatusContainer}>
        <Text style={styles.punchStatusTitle}>Current Status</Text>
        <View style={[
          styles.statusIndicator,
          { backgroundColor: punchStatus === 'In' ? '#00C853' : '#d50000' }
        ]}>
          <Text style={styles.statusText}>{punchStatus}</Text>
        </View>
        <Pressable style={styles.manualPunchButton} onPress={handleManualPunch}>
          <Text style={styles.manualPunchText}>
            Manual {punchStatus === 'In' ? 'Punch Out' : 'Punch In'}
          </Text>
        </Pressable>
      </View>

      {/* Location List */}
      <FlatList
        data={dummyLocations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.locationTitle}>{item.name}</Text>
            <Text style={styles.locationAddress}>{item.address}</Text>
            <Pressable
              style={styles.selectButton}
              onPress={() => {
                setSelectedLocation(item);
              }}
            >
              <Text style={styles.buttonText}>Select</Text>
            </Pressable>
          </View>
        )}
      />

      {/* Floating Add Button */}
      <Pressable style={styles.fab} onPress={() => navigation.navigate('LocationPickerScreen')}>
        <Text style={styles.fabText}>＋</Text>
      </Pressable>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={20} color={Colors.white} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PunchStatus')}>
          <Icon name="clock" size={20} color={Colors.lightGrey} />
          <Text style={styles.navText}>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={20} color={Colors.lightGrey} />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Support')}>
          <Icon name="help-circle" size={20} color={Colors.lightGrey} />
          <Text style={styles.navText}>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
  },
  selectedLocation: {
    backgroundColor: Colors.grey,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedLocationText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
  selectedLocationAddress: {
    fontSize: 12,
    color: Colors.lightGrey,
  },
  changeButton: {
    backgroundColor: Colors.disabledTint,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  changeButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  punchStatusContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  punchStatusTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
    marginBottom: 8,
  },
  statusIndicator: {
    width: 120,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  statusText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  manualPunchButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.tintColor,
  },
  manualPunchText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: Colors.grey,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 6,
  },
  locationAddress: {
    fontSize: 14,
    color: Colors.lightGrey,
    marginBottom: 12,
  },
  selectButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.tintColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 90,
    backgroundColor: Colors.tintColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: Colors.white,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Colors.grey,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: Colors.white,
    fontSize: 10,
    marginTop: 4,
  },
});