import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Fag from '../screens/Kollokvie';

import Gruppe from '../screens/Gruppe';

import Test from '../screens/Test';

import Hub from '../screens/HubScreen';
import SignUp from '../screens/login/SignUp';

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

const SignupStack = createStackNavigator({
  SignUp: SignUp
});

const AppContainer = createAppContainer(createBottomTabNavigator(
  {
    SignupStack,
    HubStack,
    KollokvieStack,
    GroupsStack,
    SettingsStack,
  })
);

export default AppContainer;
