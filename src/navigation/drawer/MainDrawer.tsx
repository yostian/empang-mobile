import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTab from '../tabs/MainTab';

export type DrawerParamList = {
  MainTab: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainTab" component={MainTab} />
    </Drawer.Navigator>
  );
}
