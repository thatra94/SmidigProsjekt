import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import Test from '../screens/Test';

const StackNavigator = createStackNavigator({
  //Login: LoginScreen,
  Home: Test
});

export default StackNavigator;
