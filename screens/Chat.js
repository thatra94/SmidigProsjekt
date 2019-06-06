import React, { Component } from "react";
import {Platform, StyleSheet, FlatList, Text, View, Alert, Image, TouchableOpacity, Button} from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';

import FireBase from '../components/FireBase';
import * as firebase from "firebase";

let fb = FireBase.getInstance();
let cid;

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || '' +fb.subject+ ' Chat!',
        headerRight: (
            <TouchableOpacity onPress={() => Alert.alert(
                'Er du sikker på at du vil forlate gruppen',
                '',
                [
                    {text: 'Avbryt', type: 'cancel'},
                    {text: 'Forlat', onPress: async () => {
                        await FireBase.removeFromGroup(firebase.auth().currentUser.uid, fb.chatId);
                        navigation.navigate('Gruppe');
                        }}
                ]
                )}>
                <Image
                    source={require('../assets/images/edit.png')}
                    style={styles.leaveButton}
                />
            </TouchableOpacity>

        )
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
            id: fb.uid,
            _id: fb.uid, // need for gifted-chat
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

    async componentWillMount() {
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
   },
   leaveButton: {
       resizeMode: 'contain',
       height: '50%',
       left: 220
   }
});
