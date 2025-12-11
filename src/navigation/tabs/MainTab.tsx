import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';

export type MainTabParamList = {
  Home: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}
