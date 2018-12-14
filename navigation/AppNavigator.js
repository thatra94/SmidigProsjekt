import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Fag from '../screens/Kollokvie';

import Gruppe from '../screens/Gruppe';

import Test from '../screens/Test';

import Hub from '../screens/HubScreen'

const KollokvieStack = createStackNavigator({
  Kollokvie: Fag
});

const GroupsStack = createStackNavigator({
  Gruppe: Gruppe
});

const SettingsStack = createStackNavigator({
  Test: Test
});

const HubStack = createStackNavigator({
  Hub: Hub
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
