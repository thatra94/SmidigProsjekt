import React from 'react';
import { Component, AppRegistry, StyleSheet, Text, View } from 'react-native';
//import { StackNavigator } from 'react-navigation';
//import List from './screens/HomeScreen';
import { createStackNavigator } from 'react-navigation';
//import AppNavigator from './navigation/AppNavigator';
import HUBScreen from './screens/MainHub';
import Test from './screens/Test.js';
import {LoginScreen} from './screens/LoginScreen';

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

firebase.initializeApp(firebaseConfig);

firebase.database().ref('database/').push({
  userCount: 0,
  userToken: true
});

firebase.database().ref('database/-LTW_MYiTAKqEpk7MOHh').update({
  usertoken: true
})

var groupRef = firebase.database().ref("database/");
var groupKey = groupRef.orderByChild('userCount').equalTo(1).on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
        console.log(data.key);
    });
});

export default class App extends Component {
  render() {
    return (
      <LoginScreen/>
    )};
  }
