import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import firebase from 'firebase'

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
        //<Image style={{marginTop: 20}} source={require('./assets/images/logo-insj.png')} />
        <Text>Loading</Text>
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
