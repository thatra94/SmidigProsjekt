import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native';
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
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 30, marginBottom: 70 }}>Registrer Deg</Text>
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
          style={styles.textInput}
          placeholder="Studieretning"
          autoCapitalize="none"
          placeholderTextColor='white'
          style={styles.textInputSelector}
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
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <TouchableOpacity  onPress={this.handleSignUp}>
            <Text>Neste</Text>
        </TouchableOpacity>
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
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
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  textInputSelector: {
    left: 18,
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
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
})
