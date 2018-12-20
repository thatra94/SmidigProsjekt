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
GroupsStack.navigationOptions = {
  tabBarLabel: 'Grupper',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-group'}
    />
  )
};

const SettingsStack = createStackNavigator({
  Test: Test
});

const HubStack = createStackNavigator({
  Hub: Hub,
  Fag: Fag,
});
HubStack.navigationOptions = {
  tabBarLabel: 'Hjem',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  )
};

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
    GroupsStack,
    SettingsStack,
    ProfilStack,
  })
);

export default AppContainer;
