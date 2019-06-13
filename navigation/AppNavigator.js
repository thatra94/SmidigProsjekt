import React from 'react';
import {Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';

import Subjects from '../screens/Subjects';
import Groups from '../screens/Groups';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import HomeScreen from '../screens/HomeScreen';
import SignUp from '../screens/login/SignUp';
import Login from '../screens/login/Login';
import Loading from '../screens/login/Loading';

const GroupsStack = createStackNavigator({
  Groups: Groups,
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

const HomeScreenStack = createStackNavigator({
  HomeScreen: HomeScreen,
  Subjects: Subjects,
});
HomeScreenStack.navigationOptions = {
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
  HomeScreenStack,
  GroupsStack,
  ProfilStack,
},
{
  tabBarOptions: {
    activeTintColor: '#670656'
  }
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
