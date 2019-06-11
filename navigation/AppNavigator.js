import React from 'react';
import {Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';

import Subjects from '../screens/Subjects';
import Gruppe from '../screens/Gruppe';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import Hub from '../screens/HomeScreen';
import SignUp from '../screens/login/SignUp';
import Login from '../screens/login/Login';
import Loading from '../screens/login/Loading';

const GroupsStack = createStackNavigator({
  Gruppe: Gruppe,
  Chat: Chat,
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

const HubStack = createStackNavigator({
  Hub: Hub,
  Subjects: Subjects,
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
  Profile: Profile
});
ProfilStack.navigationOptions = {
  tabBarLabel: 'Profile',
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

const BottomTabStack = createBottomTabNavigator({
  HubStack,
  GroupsStack,
  ProfilStack,
});

const AppContainer = createAppContainer(createStackNavigator(
  {
    SignupStack,
    BottomTabStack,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: 'false'
    }
  })
);

export default AppContainer;
