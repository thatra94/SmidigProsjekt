import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,  StatusBar } from 'react-native'
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
      .then(() => this.props.navigation.navigate('Hub'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return ( 
        <View style={styles.backgroundContainer}>
          <View style={styles.container}>
            <Text style={{color: 'white', margin: 40, fontSize: 30}}>Logg inn</Text>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
              </Text>}
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Brukernavn"
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
    margin: 40,
  },
  loginButton: {
    marginTop: 80,
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
  registerButton: {
    
  },
  registerText: {
    color: 'white',
    fontSize: 20,
    textDecorationLine: 'underline',
  },

})
