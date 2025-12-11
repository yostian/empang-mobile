import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './stacks/AuthStack';

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
