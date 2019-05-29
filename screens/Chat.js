import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';

import FireBase from '../components/FireBase';
import * as firebase from "firebase";
import CustomListView from '../components/CustomListView';

let fb = FireBase.getInstance();

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || '' +fb.setChatName(fb.groupId)+ ' Chat!',
    });

    state = {
        messages: [],
    };

    get user() {
        return {
            name: fb.getName(),
            //email: this.props.navigation.state.params.email,
           // avatar: this.props.navigation.state.params.avatar,
            avatar: firebase.auth().currentUser.photoURL,
            id: FireBase.getInstance().uid,
            _id: FireBase.getInstance().uid, // need for gifted-chat
        };
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={fb.send}
                user={this.user}
             alignTop={30} initialText={"IceBreaker..."}/>
        );
    }

    componentDidMount() {

        fb.refOn(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );

    }
    componentWillUnmount() {
        fb.refOff();
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
