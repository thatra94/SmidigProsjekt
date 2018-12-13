import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import HomeScreen from '../screens/MainHub'

import Fag from '../screens/Kollokvie';

import Gruppe from '../screens/Gruppe';

import Test from '../screens/Test';

const HubStack = createStackNavigator({
  Hub: HomeScreen
});

const KollokvieStack = createStackNavigator({
  Kollokvie: Fag
});

const GroupsStack = createStackNavigator({
  Gruppe: Gruppe
});

const SettingsStack = createStackNavigator({
  Test: Test
});

const AppContainer = createAppContainer(createBottomTabNavigator(
  {
    HubStack,
    KollokvieStack,
    GroupsStack,
    SettingsStack,
  }
));

export default AppContainer;
