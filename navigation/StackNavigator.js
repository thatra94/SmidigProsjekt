import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

//import LoginScreen from '../screens/LoginScreen';
import Test from '../screens/Test';
import Gruppe from '../screens/Gruppe';
import Hub from '../screens/HubScreen';

const Navigation = createStackNavigator({
  Gruppe: Gruppe,
  Test: Test,
  Hub: Hub,
});

const StackContainer = createAppContainer(createStackNavigator({
  Navigation
}));

export default StackContainer;
