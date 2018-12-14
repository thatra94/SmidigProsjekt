import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Test from './screens/Test.js';
import LoginScreen from './screens/LoginScreen';
import Fag from './screens/Kollokvie';
//import Profil from './screens/Profil';
import Gruppe from './screens/Gruppe';
import AppContainer from './navigation/AppNavigator';
import StackContainer from './navigation/StackNavigator';

//import FireBase from '.components/FireBase';

import * as firebase from 'firebase';

import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';

/*const MainNavigation = createStackNavigator({
    Kollokvie: List
});*/

//Initialize firebase

const firebaseConfig = {
  apiKey: "AIzaSyA8WS2uhrgoz0ldb-Uke0Uz0fv_cVfQehU",
  authDomain: "smidigprosjekt-e3cdc.firebaseapp.com",
  databaseURL: "https://smidigprosjekt-e3cdc.firebaseio.com",
  projectId: "smidigprosjekt-e3cdc",
  storageBucket: "smidigprosjekt-e3cdc.appspot.com",
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  render() {
    return (
      //<StackContainer/>
      <AppContainer/>
    )};
  }
