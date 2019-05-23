import React from 'react';
import { LinearGradient } from 'expo';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as firebase from 'firebase';
import FireBase from '../components/FireBase';

export default class HomeScreen extends React.Component {
  constructor(){
    super();
    fb = FireBase.getInstance();
    //fb.mountElements();
      fb.getGroups(firebase.auth().currentUser.uid);
      fb.getSubjects(firebase.auth().currentUser.uid);
      fb.mountName(firebase.auth().currentUser.uid);
      fb.mountStudy(firebase.auth().currentUser.uid);
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
            // Bakgrunn 
            // Lilla header 
            // Gradient sirkel
            // Logo
            // Hvit boks
            // Studieretning-knapp
            // Velg et emne-knapp
            <View style={styles.container}>
      
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: 450, 
                            height: 470, 
                            backgroundColor: '#330F2A'}} />
              </View>
      
              <LinearGradient
                colors={['#D54FBA', '#3F0630']}
                style={{position: 'absolute',
                        top: -120,
                        left: -40,
                        width: 500,
                        height: 500,
                        borderRadius: 500/2}}>
              </LinearGradient>
      
              <Image source={require('../assets/images/Hvit.png')}
                    style={{position: 'absolute',
                            right: 120,
                            top: 90,
                            flex: 1,
                            width: 185,
                            height: 185}}
                            resizeMode="stretch"
                              />
            
            <View style={{
                          position: 'absolute',
                          top: 300,
                          right: 45,
                          width: 320, 
                          height: 430, 
                          backgroundColor: 'white', 
                          borderRadius: 50,
                          borderColor: 'black',
                          shadowColor: 'black',
                          shadowOffset:{width: 6, height: 5},
                          shadowOpacity: 0.4}}>
      
            <Text style={{textAlign: 'center', 
                          marginTop: 60, 
                          color: '#5D1049',
                          fontSize: 20,
                          fontWeight: 'bold' }}>
                            Hvordan vil du finne gruppe?</Text>          
      
            <View style={{flex: 1, 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          marginTop: 40, 
                          shadowOffset:{width: 6, height: 5}, 
                          shadowColor: 'black', 
                          shadowOpacity: 0.4}}>
              
              <TouchableOpacity onPress={() => 
                            {this.props.navigation.navigate('Gruppe')}}
                            style={{height: 85, top: 10}}>
              <View style={{flex: 1, 
                            flexDirection: 'row', 
                            marginTop: 15, 
                            width: 250, 
                            height: 70, 
                            backgroundColor: '#5D1049', 
                            borderRadius: 23 }}>
              <Image source={require('../assets/images/open-book.png')}
                    style={{width: 35, 
                            height: 35, 
                            marginTop: 16, 
                            marginLeft: 20}}
                            />
              <Text style={{textAlign: 'center', 
                            marginTop: 25, 
                            marginLeft: 30,
                            fontWeight: 'bold',
                            fontSize: 18, 
                            color: 'white' }}>Studieretning</Text>
                            </View>
                      </TouchableOpacity>
      
              <TouchableOpacity onPress={() => 
                            {this.props.navigation.navigate('Fag')}}
                    style={{height: 105, top: 20}}>
              <View style={{flex: 1,
                            flexDirection: 'row', 
                            marginTop: 35, 
                            width: 250, 
                            height: 70, 
                            backgroundColor: '#5D1049', 
                            borderRadius: 23 }}>
      
              <Image source={require('../assets/images/college.png')}
                    style={{width: 35, 
                            height: 35, 
                            marginTop: 17, 
                            marginLeft: 20}}
                              />
      
              <Text style={{textAlign: 'center', 
                            marginTop: 25, 
                            color: 'white', 
                            marginLeft: 30,
                            fontWeight: 'bold',
                            fontSize: 18 }}>
                              Velg et emne
                          </Text>
                      </View>
                    </TouchableOpacity>
      
                </View>
              </View>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(47,163,218, .4)'
  },
  menuContainer: {
    height: '40%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
