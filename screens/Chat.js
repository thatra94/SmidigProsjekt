import React from "react";
import {StyleSheet, Alert, Image, TouchableOpacity} from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';

import FireBase from '../components/FireBase';
import * as firebase from 'firebase';

let fb = FireBase.getInstance();

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || '' +fb.subject+ ' Chat!',
        headerStyle: {
            borderBottomColor:'transparent',
            borderBottomWidth: 0,
        },
        headerRight: (
            <TouchableOpacity
                onPress={() => Alert.alert(
                'Er du sikker på at du vil forlate gruppen',
                '',
                [
                    {text: 'Avbryt', type: 'cancel'},
                    {text: 'Forlat', onPress: async () => {
                        await FireBase.removeFromGroup(firebase.auth().currentUser.uid, fb.chatId);
                            navigation.navigate('Groups');
                        }, style: 'destructive'}
                ]
                )}
                style={styles.leaveButtonTouchable}
            >
                <Image
                    source={require('../assets/images/forlatgruppe.png')}
                    style={styles.leaveButton}
                />
            </TouchableOpacity>
        )
    });

    state = {
        messages: [],
    };

    static get user() {
        return {
            name: fb.getName(),
            avatar: firebase.auth().currentUser.photoURL,
            id: fb.uid,
            _id: fb.uid,
        };
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={fb.send}
                user={Chat.user}
                initialText={""}/>
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
      backgroundColor: '#f2f2f2',
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
   leaveButtonTouchable: {
       width: 80,
       height: 40,
       right: 10,
   },
   leaveButton: {
       resizeMode: 'cover',
       width: 25,
       height: 25,
       left: 45,
       top: 6
   }
});
