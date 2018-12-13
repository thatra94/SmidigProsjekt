import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

//import LoginScreen from '../screens/LoginScreen';
import Test from '../screens/Test';
import Gruppe from '../screens/Gruppe';

const GruppeStack = createStackNavigator({
  Gruppe: Gruppe
});

const StackContainer = createAppContainer(createStackNavigator({
  GruppeStack
}));

export default StackContainer;
