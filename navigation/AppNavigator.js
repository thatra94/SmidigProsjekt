import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Fag from '../screens/Kollokvie';

import Gruppe from '../screens/Gruppe';

import Test from '../screens/Test';

import Profil from '../screens/Profil';

import Hub from '../screens/HubScreen';
import SignUp from '../screens/login/SignUp';
import Login from '../screens/login/Login';

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

const ProfilStack = createStackNavigator({
  Profil: Profil
});

const SignupStack = createStackNavigator({
  SignUp: SignUp,
  Login: Login,
});

const AppContainer = createAppContainer(createBottomTabNavigator(
  {
    SignupStack,
    HubStack,
    KollokvieStack,
    GroupsStack,
    SettingsStack,
    Profil,
  })
);

export default AppContainer;
