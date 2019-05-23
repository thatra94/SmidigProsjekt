import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button
} from 'react-native';
import firebase from 'firebase';
import { LinearGradient } from 'expo';



export default class Profil extends React.Component {

     static navigationOptions = {
      header: null,
  };
    
  signOutUser = () => {
    firebase
      .auth()
        .signOut()
          .then(() => {
            console.log('sign out succesful')
          }).catch(error => console.log('error'))
      }
  
  render() {
    return (
    <View style={styles.backgroundContainer}>
        
        <LinearGradient
                colors={['#D54FBA', '#3F0630']}
                style={{position: 'absolute',
                        top: -120,
                        left: -40,
                        width: 500,
                        height: 500,
                        borderRadius: 500/2}}>
              </LinearGradient>
        <View style={styles.TitleContainer}>
            <Text style={styles.pageTitle}>Din profil</Text>
        </View>
        <View style={styles.container}>
            <Image style={styles.profileIcon} source={require('../assets/images/user.png' )}/>
            <TouchableOpacity style={styles.editIconContainer} activeOpacity={0.5}>
                <Image
                source={require('../assets/images/edit.png')}
                style={styles.editIcon} />
                <Text style={styles.TextStyle}></Text>
            </TouchableOpacity>
        
            <Text style={styles.nameUser}>John Doe</Text>
            <Text style={styles.studentUser}>Student</Text>
            <Text style={styles.studyUser}>Programmering</Text>
        
            <Button color='red' title="Logg ut" onPress={this.signOutUser} />
        </View>
    </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
	   width: 0,
	   height: 3,
    },
    shadowOpacity: 0.50,
    shadowRadius: 4.65,
    elevation: 13,
    width: 340,
    height: 450,
  },
    container2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
    backgroundContainer: {
    backgroundColor: '#3e1133',
    width: '100%',
    height: '100%',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
    pageTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    marginBottom: 0,
  },
    nameUser: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 25,
  },
    studyUser: {
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
  },
    studentUser: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
    profileIcon:{
    marginTop: 40,
    height: '35%',
    width: '100%',
    resizeMode: 'contain',
  },
    editIcon:{
    height: '250%',
    resizeMode: 'contain',
  },
    editIconContainer:{
    position: 'absolute',
    marginTop: 20,
    left: 50,
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
