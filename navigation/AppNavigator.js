import React from 'react';
import {Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';

import Fag from '../screens/Kollokvie';
import Gruppe from '../screens/Gruppe';
import Test from '../screens/Test';
import Profil from '../screens/Profil';
import Hub from '../screens/HomeScreen';
import SignUp from '../screens/login/SignUp';
import Login from '../screens/login/Login';
import Loading from '../screens/login/Loading';

const GroupsStack = createStackNavigator({
  Gruppe: Gruppe
});
GroupsStack.navigationOptions = {
  tabBarLabel: 'Grupper',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-people'}
    />
  )
};

const SettingsStack = createStackNavigator({
  Test: Test
});
SettingsStack.navigationOptions = {
  tabBarLabel: 'Test',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'}
    />
  )
};

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
ProfilStack.navigationOptions = {
  tabBarLabel: 'Profil',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-person'}
    />
  )
};

const SignupStack = createStackNavigator({
  Loading: Loading,
  SignUp: SignUp,
  Login: Login,
});
SignupStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarVisible: false,
};

const AppContainer = createAppContainer(createBottomTabNavigator(
  {
    SignupStack,
    HubStack,
    GroupsStack,
    ProfilStack,
    SettingsStack,
  })
);

export default AppContainer;
