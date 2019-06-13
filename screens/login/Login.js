import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity,  StatusBar, Image } from 'react-native'
import { LinearGradient } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from 'firebase'

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  static navigationOptions = {
      header: null,
  };

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('HomeScreen'))
      .catch(error => this.setState({ errorMessage: "Login feilet, inkorrekt brukernavn eller passord" }))
  }

  render() {
    return (
        <KeyboardAwareScrollView
            style={{backgroundColor: '#3F0630'}}
            resetScrollToCoords={{x: 0, y: 0}}
            containContainerStyle={styles.backgroundContainer}
            scrollEnabled={true}
        >
            <ScrollView scrollEventThrottle={16} keyboardShouldPersistTaps={"handled"}>
        
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                </View>
        
                <LinearGradient
                    colors={['#D54FBA', '#3F0630']}
                    style={styles.gradientCircle}>
                </LinearGradient>

                <View style={styles.container}>
                    <Image
                    style={styles.logo}
                    source={{uri: 'https://i.imgur.com/KPVfX73.png'}}
                    />
        
                <Text style={{color: 'white', marginTop: '35%', fontSize: 30, marginBottom: '15%'}}>Logg inn</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
        
                <TextInput
                  style={styles.textInput}
                  autoCapitalize="none"
                  placeholder="Email"
                  placeholderTextColor='white'
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
                      
                <TextInput
                  secureTextEntry
                  style={styles.textInput}
                  autoCapitalize="none"
                  placeholder="Passord"
                  placeholderTextColor='white'
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />

                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} style={styles.registerButton}>
                    <Text style={styles.registerText}>Registrer deg</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginText}>Logg inn</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: '#3e1133',
    height: hp ('100%'),
    width: wp ('100%')
  },
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 8,
    color: 'white',
    fontSize: 20,
    borderBottomColor: 'white',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    margin: 40,
  },
  loginButton: {
    marginTop: 80,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    padding: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  loginText: {
    color: '#3e1133',
    fontSize: 20,
  },
  registerText: {
    color: 'white',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  logo:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 110,
    top: 50,
    flex: 1,
    width: 55,
    height: 60
  },
  /*Gradient bakgrunn*/
  gradientCircle:{
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-17%',
    top: -120,
    width: 500,
    height: 500,
    borderRadius: 500/2
  },

})
