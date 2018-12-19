import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'firebase';
import RNPickerSelect from 'react-native-picker-select';

export default class SignUp extends React.Component {
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

/*
componentDidMount() {
  this.authListener();
}

authListener() {
  const { email, firstName} = this.state
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("We are authenticated now!");
      useruid = user.uid,
      console.log(useruid),
      firebase.database().ref('users/' + useruid).set({
        email: email.toLowerCase(),
        firstName: firstName
    })  } else {
      console.log("you are not authenticated");
    }
  });
}
*/

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
        /*.then((user) => {
              console.log(user.uid);
              firebase.database().ref('users/' + user.uid).set({
                email: email.toLowerCase(),
                firstName: firstName
          })
          console.log(user.uid)
          console.log("22")
        })
      })
      *///.then(user => this.props.navigation.navisgate('Main'))
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
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

        <TextInput
          placeholder="Fornavn"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
        />
        <TextInput
          placeholder="Etternavn"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
        />
        <RNPickerSelect
          items={this.state.items}
          style={styles.textInputSelector}
          //placeholder="Studieretning"
          onValueChange={(value) => {
            this.setState({
              studySubject: value,
            });
          }}
        >
        <TextInput
          placeholder="Studieretning"
          autoCapitalize="none"
          style={styles.textInputSelector}
          onChangeText={studySubject => this.setState({ studySubject })}
          value={this.state.studySubject}
        />
        </RNPickerSelect>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  }
})
