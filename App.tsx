import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Buffer } from 'buffer';
import { View } from 'react-native';

import MainLayout from './src/components/MainLayout';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SplashScreen from './src/components/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import MessageScreen from './src/screens/MessageScreen';
import EmergencyScreen from './src/screens/emergency/EmergencyScreen';
import MechanicListScreen from './src/screens/emergency/MechanicListScreen';
import ConfirmMechanicScreen from './src/screens/emergency/ConfirmMechanicScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (typeof global !== 'undefined' && !global.Buffer) {
  global.Buffer = Buffer;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Splash: undefined;
  Home: undefined;
  Profile: undefined;
  Activity: undefined;
  Message: undefined;
  Emergency: undefined;
  MechanicList: undefined;
  ConfirmMechanicEM: undefined;
};

const STORAGE_KEY = 'userData';
const Stack = createNativeStackNavigator<RootStackParamList>();

const withMainLayout =
  (Component: React.FC<any>, hideHeader?: boolean) => (props: any) =>
    (
      <MainLayout hideHeader={hideHeader}>
        <Component {...props} />
      </MainLayout>
    );

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem(STORAGE_KEY);
        setIsLoggedIn(!!userData);
      } catch (error) {
        console.error('Error reading userData:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        {/* Semua screen harus terdaftar di sini */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="Emergency" component={EmergencyScreen} />
        <Stack.Screen name="MechanicList" component={MechanicListScreen} />
        <Stack.Screen
          name="ConfirmMechanicEM"
          component={ConfirmMechanicScreen}
        />

        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
