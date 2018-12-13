import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Gruppe extends React.Component {
  render() {
    return (
        //welcome - Text
      <View style={styles.container}>
        <View style={styles.box1}>
        <Text style={styles.welcome}>Studiegruppe</Text>
        <Text style={styles.subText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </View>


        <Text style={styles.welcome}>Vors</Text>
        <Text style={styles.welcome}>Brettspill</Text>
        <Text style={styles.welcome}>Utveksling</Text>
        <Text style={styles.welcome}>Minigolf</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#F5FCFF',
  },
    box1: {
    marginTop: 20,
    backgroundColor: 'pink',
    height: 170,
  },
  welcome: {
    flex: 1,
    margin: 20,
    backgroundColor: 'orange',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 30,
  },
    subText: {
    margin: 20,
    backgroundColor: 'orange',
    textAlign: 'center',
    fontSize: 10,
    paddingLeft: 40,
    paddingRight: 40,
  }
});
