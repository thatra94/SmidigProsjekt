import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
//import { StackNavigator } from 'react-navigation';
//import List from './screens/HomeScreen';
import { createStackNavigator } from 'react-navigation';
//import AppNavigator from './navigation/AppNavigator';
//import HUBScreen from './screens/MainHub';
import Test from './screens/Test.js';
import LoginScreen from './screens/LoginScreen';
import List from './screens/HomeScreen';
//import Profil from './screens/Profil';
import Gruppe from './screens/Gruppe';
import AppContainer from './navigation/AppNavigator';
//import FireBase from '.components/FireBase';

//import HUBScreen from '  ../screens/HUBScreen.js';
//import createAppContainer from '.navigation/AppNavigator';

import * as firebase from 'firebase';

import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';

/*const MainNavigation = createStackNavigator({
    Kollokvie: List
});*/

/*
const MainStack = createStackNavigator({
  //Login: LoginScreen,
  Home: HUBScreen
});
*/

//Initialize firebase

const firebaseConfig = {
  apiKey: "AIzaSyA8WS2uhrgoz0ldb-Uke0Uz0fv_cVfQehU",
  authDomain: "smidigprosjekt-e3cdc.firebaseapp.com",
  databaseURL: "https://smidigprosjekt-e3cdc.firebaseio.com",
  projectId: "smidigprosjekt-e3cdc",
  storageBucket: "smidigprosjekt-e3cdc.appspot.com",
};

firebase.initializeApp(firebaseConfig)

export default class App extends Component {
  render() {
    return (
      <AppContainer/>
    )};
  }
