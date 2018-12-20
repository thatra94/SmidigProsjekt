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
import Fag from '../screens/Kollokvie';
import Loading from '../screens/login/Loading';
import SignUp from '../screens/login/SignUp';
import Login from '../screens/login/Login';

const Navigation = createStackNavigator({

Test: Test,
  Gruppe: Gruppe,
  Hub: Hub,
  Fag: Fag,
  Loading: Loading,
  SignUp: SignUp,
  Login: Login,
});

const StackContainer = createAppContainer(createStackNavigator({
  Navigation
}));

export default StackContainer;
