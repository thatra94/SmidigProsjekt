import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import firebase from 'firebase'
import FireBase from "../../components/FireBase";

let fb = FireBase.getInstance();
let useruid;

export default class Loading extends React.Component {
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("We are authenticated now!");
        useruid = user.uid;
        console.log(useruid);
        this.mountComponents();
        this.props.navigation.navigate('Hub');
      } else {
        console.log("you are not authenticated");
        this.props.navigation.navigate('SignUp')
      }
    });
  }

  mountComponents() {
    fb.getGroups(useruid);
    fb.getSubjects(useruid);
    fb.mountName(useruid);
    fb.mountStudy(useruid);
  }


  render() {
    return (
        <View style={styles.container}>
          <Image
              style={{height: '23%', width: '40%', marginBottom: 40}}
              source={require('../../assets/images/lilla.png')}
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
