import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo';
import {
    Alert,
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

let fb = FireBase.getInstance();

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
        <View style={styles.container}>
          <View EventThrottle={16}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>

                <View style={styles.purpleBackground} />

                <LinearGradient
                    colors={['#D54FBA', '#3F0630']}
                    style={styles.gradientCircle}>
                </LinearGradient>

                <Image source={require('../assets/images/Hvit.png')}
                       style={styles.logo}
                       resizeMode="stretch"/>

                <View style={styles.whiteFrame}>

                  <View style={styles.whiteContainer}>

                    <Text style={styles.txtGroup}>
                      Hvordan vil du finne gruppe?</Text>

                    <View style={styles.btnContainer}>
                      <View style={styles.btnShadow}>

                        <TouchableOpacity
                            onPress={async () => {Alert.alert(
                                "Er du sikker?",
                                "Dette legger deg til i en gruppe fra din studieretning",
                                [
                                    {text: "Avbryt", type: "cancel"},
                                    {text: "Fortsett", onPress: async () => {
                                            await fb.joinGroup(firebase.auth().currentUser.uid, fb.getStudy());
                                            this.props.navigation.navigate("Gruppe");}}]
                            )}}
                            style={{height: 120, top: -20}}>
                          <View style={styles.btnStudieretning}>
                            <Image source={require('../assets/images/open-book.png')}
                                   style={styles.bookIcon}
                            />
                            <Text style={styles.txtStudieretning}>Studieretning</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() =>
                        {this.props.navigation.navigate('Fag')}}
                                          style={{height: 110, top: 10}}>
                          <View style={styles.btnVelgEmne}>
                            <Image source={require('../assets/images/college.png')}
                                   style={styles.collegeIcon}
                            />
                            <Text style={styles.txtVelgEmne}>
                              Velg et emne
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
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
    height: hp ('100%'),
    width: wp ('100%')
  },
  whiteContainer:{
    bottom: '7%',
    padding: '2%'
  },
  btnContainer:{
    bottom: '8%'
  },
  purpleBackground: {
    width: wp('100%'),
    backgroundColor: '#330F2A',
    ...Platform.select({
      ios: {
        height: hp('60%'),
      },
      android: {
        height: hp('100%'),
      },
    }),
  },
  gradientCircle:{
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-17%',
    top: -100,
    width: 500,
    height: 500,
    borderRadius: 500/2
  },
  logo:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 110,
    top: 70,
    flex: 1,
    width: 135,
    height: 135
  },
  whiteFrame:{
    position: 'absolute',
    //margin: '5%',
    width: wp('90%'),
    //height: hp('55%'),
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: '62%',
    borderWidth: 0.5,
    borderColor: '#d6d7da', 
    shadowColor: 'black',
    shadowOffset:{width: 6, height: 5},
    shadowOpacity: 0.4,
    ...Platform.select({
          ios: {
            top: '45%',
            height: hp('55%'),
            //marginTop: '62%',
            margin: '5%',
          },
          android: {
            top: '25%',
            //marginTop: '25%',
            //height: hp('55%'),
          }
    }),
  },

  txtGroup:{
    textAlign: 'center',
    marginTop: 60,
    color: '#5D1049',
    fontSize: 20,
    fontWeight: 'bold'
  },
  btnShadow:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    shadowOffset:{width: 6, height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.4
  },
  btnStudieretning:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    width: wp('70%'),
    height: hp('20%'),
    backgroundColor: '#5D1049',
    borderRadius: 30
  },
  txtStudieretning:{
    textAlign: 'center',
    marginTop: 35,
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  bookIcon:{
    width: 35,
    height: 35,
    marginTop: 27,
    marginLeft: 20
  },
  btnVelgEmne:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    width: wp('70%'),
    height: hp('20%'),
    backgroundColor: '#5D1049',
    borderRadius: 30
  },
  collegeIcon:{
    width: 35,
    height: 35,
    marginTop: 27,
    marginLeft: 20
  },
  txtVelgEmne:{
    textAlign: 'center',
    marginTop: 35,
    color: 'white',
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 18
  },

//Har ikke kodet resten. Vet ikke hvis man skal beholde den
  /*
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
  },*/
});
