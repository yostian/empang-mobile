import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Buffer } from 'buffer';
import { View } from 'react-native';

import MainLayout from './src/components/MainLayout';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SplashScreen from './src/components/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (typeof global !== 'undefined' && !global.Buffer) {
  global.Buffer = Buffer;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Splash: undefined;
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
        initialRouteName={isLoggedIn ? 'Login' : 'Register'}
      >
        {/* Semua screen harus terdaftar di sini */}
        <Stack.Screen
          name="Login"
          component={withMainLayout(LoginScreen, true)}
        />
        <Stack.Screen
          name="Register"
          component={withMainLayout(RegisterScreen, true)}
        />

        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
