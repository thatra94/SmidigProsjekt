import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
//import { StackNavigator } from 'react-navigation';
//import List from './screens/HomeScreen';
import { createStackNavigator } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';
import HUBScreen from './screens/MainHub';

//import HUBScreen from '../screens/HUBScreen.js';
//import createAppContainer from '.navigation/AppNavigator';

import * as firebase from 'firebase';

import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';


/*const MainNavigation = createStackNavigator({
    Kollokvie: List
});*/

const MainStack = createStackNavigator({
  //Login: LoginScreen,
  Home: HUBScreen
});


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

export default class LoginScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }

  signUpUser = (email, password) => {

    try{

      if (this.state.password.length < 6) {
        alert("Please enter a password with length of atleast 6 characters")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch(error){
      console.log(error.toString())
    }
  }

  loginUser = (email, password) => {

    try{

      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
          console.log(user)
        })
      })

    }
    catch(error) {
      console.log(error.toString())
    }
  }

  async loginWithFacebook() {

    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync
    ('277227992982251', {permissions: ['public_profile']})

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredentials(credential).catch((error) => {
        console.log(error)
      })
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>

          <Item floatingLabel>
            <Label> Email </Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
            <Label> Password </Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Button style={{marginTop: 40}}
            full
            rounded
            success
            //onPress={()=> this.loginUser(this.state.email, this.state.password)}
            onPress={()=> this.props.navigation.navigate('Home')}
          >
            <Text> Login </Text>
          </Button>

          <Button style={{marginTop: 20}}
            full
            rounded
            primary
            onPress={()=> this.signUpUser(this.state.email, this.state.password)}
          >
            <Text> Sign Up </Text>
          </Button>

          <Button style={{marginTop: 20}}
            full
            rounded
            primary
            onPress={()=> this.loginWithFacebook()}
          >
            <Text> Login with Facebook </Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});
