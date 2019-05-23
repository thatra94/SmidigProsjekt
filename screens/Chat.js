import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";

import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';

import FireBase from '../components/FireBase';
import CustomListView from '../components/CustomListView';

 var groupList = [];

 function getGroups(userId){

    firebase.database().ref('users/' + userId+'/groups')
      .once("value").then(function (snapshot){
        snapshot.forEach(function(snapshot) {
          firebase.database().ref('Groups/'+snapshot.key)
          .once("value").then(function(snapshot){
            groupList.push({
              id: snapshot.key,
              title: snapshot.val().subject,
            });
          });
        });
      });
}


async function getStudies(userId) {
    let studies = [];
    let result = [];
    await firebase.database().ref('users/' + userId)
        .once("value").then(function (snapshot) {
            firebase.database().ref("Studie/" + snapshot.val().studieretning)
                .once("value").then(function (snapshot) {
                snapshot.forEach(function (snapshot) {
                    studies.push({title: snapshot.key})
                });
                let result = studies.map(a => a.title);
                console.log(studies);
                return studies;
            })
        });
}


export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        messages: [],
    };

    /*get user() {
        return {
            name: this.props.navigation.state.params.firstName,
            //email: this.props.navigation.state.params.email,
           // avatar: this.props.navigation.state.params.avatar,
            id: firebaseSvc.uid,
            _id: firebaseSvc.uid, // need for gifted-chat
        };
    }*/

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={firebase.send}
                user={this.user}
             alignTop={30} initialText={"IceBreaker"}/>
        );
    }
/*
    componentDidMount() {
        firebase.refOn(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }*/
    componentWillUnmount() {
        firebase.refOff();
    }
}

const styles = StyleSheet.create ({
   container: {
      padding: 30,
      backgroundColor: '#ff6650',
      alignItems: 'center',
      borderWidth: 0.3,
      height: 150,
      borderColor: 'black',
      marginTop: 5,

   },
   text: {
      color: '#4f603c',
      fontSize: 20,
   }
});
