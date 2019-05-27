import React from 'react';
import { ScrollView, Image, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { LinearGradient } from 'expo';
import RNPickerSelect from 'react-native-picker-select';

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
    errorMessage: null }

  handleSignUp = () => {
    const { email, password, firstName, lastName, studySubject } = this.state
    firebase
      .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          user = firebase.auth().currentUser,
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
                
            <LinearGradient
                colors={['#D54FBA', '#3F0630']}
                style={{position: 'absolute',
                        top: -120,
                        left: -40,
                        width: 500,
                        height: 500,
                        borderRadius: 500/2}}>
              </LinearGradient>
        
                <ScrollView scrollEventThrottle={16}>
                  
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    </View>
        
                  
                    <View style={styles.container}>
                        <Text style={{color: 'white', fontSize: 30, marginBottom: '10%', marginTop: '20%' }}>Registrer deg</Text>
                        {this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                        </Text>}

                    <TextInput
                      style={styles.textInput}
                      placeholder="Fornavn"
                      autoCapitalize="none"
                      style={styles.textInput}
                      placeholderTextColor='white'
                      onChangeText={firstName => this.setState({ firstName })}
                      value={this.state.firstName}
                    />
                          
                    <TextInput
                      style={styles.textInput}
                      placeholder="Etternavn"
                      autoCapitalize="none"
                      style={styles.textInput}
                      placeholderTextColor='white'
                      onChangeText={lastName => this.setState({ lastName })}
                      value={this.state.lastName}
                    />
                          
                    <RNPickerSelect
                      items={this.state.items}
                      style={styles.textInputSelector}

                      onValueChange={(value) => {
                        this.setState({
                          studySubject: value,
                        });
                      }}
                    >
                    <TextInput
                      placeholder="Studieretning"
                      autoCapitalize="none"
                      placeholderTextColor='white'
                      style={{marginRight: 20}}
                      style={styles.pickerText}
                      onChangeText={studySubject => this.setState({ studySubject })}
                      value={this.state.studySubject}
                    />
                    </RNPickerSelect>
                    <TextInput
                      style={styles.textInput}
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

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.registerText}>Allerede bruker? Logg inn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={this.handleSignUp}>
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
    width: '100%',
    height: '100%',
  },  
  container: {
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
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 40,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    padding: 30,
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
  pickerText:{
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
    marginLeft: 20,
    marginBottom: 20,
  },
})
