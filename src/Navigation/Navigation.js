import React from 'react';
import {
    createStackNavigator,
  } from '@react-navigation/stack';
import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import HomeDetails from '../Screens/HomeDetails/HomeDetails';
import ManageScreen from '../Screens/Manage/ManageScreen';

import SignUpScreen from '../Screens/Signup/SignUpScreen';
import LoginScreen from '../Screens/Login/LoginScreen';
import DriverFormScreen from '../Screens/DriverForm/DriverFormScreen';
import DriverDetailsScreen from '../Screens/DriverDetails/DriverDetailsScreen';

const MainStackNavigator = () => {
    const Stack = createStackNavigator();
    const options = {
        headerShown: false,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        gestureResponseDistance: 500,
      };
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HomeDetails" component={HomeDetails} />
      <Stack.Screen name="ManageScreen" component={ManageScreen} />
      <Stack.Screen name="DriverFormScreen" component={DriverFormScreen} />
      <Stack.Screen name="DriverDetailsScreen" component={DriverDetailsScreen} />

      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
