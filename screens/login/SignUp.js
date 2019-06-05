import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity,  StatusBar, Image, Platform } from 'react-native'
import { LinearGradient } from 'expo';
import RNPickerSelect from 'react-native-picker-select';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from 'firebase'

export default class SignUp extends React.Component {

  static navigationOptions = {
      header: null,
  };

  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName:'',
    studySubject: '',
    items: [
      { label: 'Programmering', value: 'Programmering' },
      { label: 'Interaktivt Design', value: 'Interaktivt Design' },
      { label: 'Spillprogrammering', value: 'Spillprogrammering' },
    ],
    errorMessage: null };

  handleSignUp = () => {
    const { email, password, firstName, lastName, studySubject } = this.state;
    firebase
      .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = firebase.auth().currentUser;
          firebase.database().ref('users/' + user.uid).set({
            email: email.toLowerCase(),
            fornavn: firstName,
            etternavn: lastName,
            studieretning: studySubject
        })
          //console.log(user),
          console.log(user.uid);
        })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

/*
saveUserData = (user) => {
    console.log(user)
    let userid = user.uid
    console.log(userid)
    firebase.database().ref('users/' + userid).set({
    email: email.toLowerCase(),
    firstName: firstName
    })
  }))
}
*/

  render() {
    return (
        <View style={styles.backgroundContainer}>
            <ScrollView scrollEventThrottle={16}>

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

                <Text style={{color: 'white', marginTop: '35%', fontSize: 30, marginBottom: '10%'}}>Registrer Deg</Text>
                {this.state.errorMessage &&
                  <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                  </Text>}

                <TextInput style={styles.textInput}
                    placeholder="Fornavn"
                    autoCapitalize="none"
                    style={styles.textInput}
                    placeholderTextColor='white'
                    onChangeText={firstName => this.setState({ firstName })}
                    value={this.state.firstName}
                    />

                <TextInput style={styles.textInput}
                    placeholder="Etternavn"
                    autoCapitalize="none"
                    style={styles.textInput}
                    placeholderTextColor='white'
                    onChangeText={lastName => this.setState({ lastName })}
                    value={this.state.lastName}
                    />

                <RNPickerSelect items={this.state.items} style={styles.textInputSelector}
                        onValueChange={(value) => {
                        this.setState({
                        studySubject: value, });
                        }}
                 >
                    <TextInput
                        placeholder="Studieretning"
                        autoCapitalize="none"
                        placeholderTextColor='white'
                        style={styles.pickerText}

                        onChangeText={studySubject => this.setState({ studySubject })}
                        value={this.state.studySubject}
                        />
                </RNPickerSelect>

                <TextInput style={styles.textInput}
                    placeholder="Email"
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    />

                <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    />

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.registerButton}>
                    <Text style={styles.registerText}>Allerede bruker? Logg inn</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.handleSignUp} style={styles.loginButton}>
                    <Text style={styles.loginText}>Neste</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
/*Input felt*/
  textInput: {
    height: 30,
    width: '90%',
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 4,
    color: 'white',
    fontSize: 20,
    borderBottomColor: 'white',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    margin: 30,
  },
  textInputSelector: {
    left: 18,
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
  pickerText: {
    marginLeft: 20,
    marginBottom: 30,
    marginTop: 10,
    fontSize: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '90%'
  },
/*Neste-knapp*/
  loginButton: {
    marginTop: 30,
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

/*Allerede Bruker txt*/
  registerText: {
    color: 'white',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
/*Gradient bakgrunn*/
  gradientCircle:{
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: -30,
    top: -120,
    width: 500,
    height: 500,
    borderRadius: 500/2
  },
  logo:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 110,
    top: 50,
    flex: 1,
    width: 55,
    height: 60,
  },

})
