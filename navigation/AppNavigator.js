import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import List from '../screens/HomeScreen';

import Gruppe from '../screens/Gruppe';

import Test from '../screens/Test';

const MainNavigation = createStackNavigator({
  Kollokvie: List
});

const GroupsStack = createStackNavigator({
  Gruppe: Gruppe
});

const SettingsStack = createStackNavigator({
  Test: Test
});

const AppContainer = createAppContainer(createBottomTabNavigator(
  {
    MainNavigation,
    GroupsStack,
    SettingsStack,
  }
));

export default AppContainer;
