import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import * as firebase from 'firebase';
import FireBase from "../../components/FireBase";

let fb = FireBase.getInstance();

export default class Loading extends React.Component {
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("We are authenticated now!");
        useruid = user.uid,
        console.log(useruid),
        fb.getGroups(firebase.auth().currentUser.uid);
        fb.getSubjects(firebase.auth().currentUser.uid);
        fb.mountName(firebase.auth().currentUser.uid);
        fb.mountStudy(firebase.auth().currentUser.uid);
        this.props.navigation.navigate('Hub')
      } else {
        console.log("you are not authenticated");
        this.props.navigation.navigate('SignUp')
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{height: '20%', width: '30%', marginBottom: 40}}
          source={require('../../assets/images/logo-insj.png')}
        />
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
