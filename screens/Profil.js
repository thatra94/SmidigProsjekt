import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

export default class Profil extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.profileIcon} source={require('../assets/images/user.png')} />
        <Text style={styles.nameUser}>John Doe</Text>
        <Text style={styles.studyUser}>Programmering</Text>

        <View style={styles.container2}>
        <View style={styles.iconOne}>
            <Image style={styles.otherIcon} source={require('../assets/images/group.png')} />
          </View>

        <View style={styles.iconTwo}>
            <Image style={styles.otherIcon} source={require('../assets/images/chat.png')} />
          </View>

        <View style={styles.iconThree}>
            <Image style={styles.otherIcon} source={require('../assets/images/snapchat.png')} />
          </View>
        </View>

        <Text style={styles.interestTitle}>Interesser</Text>
        <Text style={styles.interestText}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 220,
    backgroundColor: 'white',
  },
    container2: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
    titlelText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 40,
  },
   nameUser: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 25,
   },
    studyUser: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
   },
    profileIcon:{
    marginTop: 40,
    height: '20%',
    width: '100%',
    resizeMode: 'contain',
    },
    interestTitle:{
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    },
    interestText:{
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: 'gray',
    marginLeft: 20,
    marginRight: 20,
    fontStyle: 'italic',
    },
    otherIcon:{
    height: '80%',
    width: '100%',
    resizeMode: 'contain',
    flexDirection: 'row',
    },
    iconOne: {
    width:40,
    height:40,
    justifyContent: 'center',
    alignItems:'center',
  },
    iconTwo: {
    width:40,
    height:40,
    justifyContent: 'center',
    alignItems:'center',
  },
    iconThree: {
    width:40,
    height:40,
    justifyContent: 'center',
  },
});
