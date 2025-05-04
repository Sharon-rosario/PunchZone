// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LocationPickerScreen from './screens/LocationPickerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Change name from "LocationPickerScreen" to "LocationPicker" */}
        <Stack.Screen name="LocationPicker" component={LocationPickerScreen} options={{ title: 'Select Office Location' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}