import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type NavProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  useEffect(() => {
    const checkLogin = async () => {
      const storedUser = await AsyncStorage.getItem('userData');
      try {
        const parsed = storedUser ? JSON.parse(storedUser) : null;
        if (parsed?.nama) {
          navigation.replace('Home');
        } else {
          navigation.replace('Dashboard');
        }
      } catch {
        navigation.replace('Dashboard');
      }
    };
    checkLogin();
  }, [navigation]);

  return null;
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 10, fontSize: 16 },
});
