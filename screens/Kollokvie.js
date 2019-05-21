import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import firebase from 'firebase';
import FireBase from '../components/FireBase';
import CustomListView from "../components/CustomListView";

//Fire.joinGroup(firebase.auth().currentUser.uid);
let fb = new FireBase;

function joinGroup(userId, subjectName){
 var testBool = false;

 var query = firebase.database().ref("Groups/")
   .once("value").then(function(snapshot) {
     snapshot.forEach(function(snapshot) {
         var userCount = snapshot.val().userCount;
         var groupKey = snapshot.key;
         if(userCount < 3){
           fb.addToGroup(groupKey, userId, userCount);
           testBool = true;
           return true;
         }
         else {
           testBool = false;
         }
     });
     if (!testBool) {
       fb.createNewGroup(userId, subjectName);
     }
 });
}

async function getStudies(userId) {
    let studies = [];
    await firebase.database().ref('users/' + userId)
        .once("value").then(function (snapshot) {
            firebase.database().ref("Studie/" + snapshot.val().studieretning)
                .once("value").then(function (snapshot) {
                snapshot.forEach(function (snapshot) {
                    studies.push({title: snapshot.key})
                });
                console.log(studies);
                return studies;
            })
        });
}

export default class Fag extends React.Component {
    constructor(props) {
        super(props);
        //this.setState({subject: getStudies(firebase.auth().currentUser.uid)})
    };

    static navigationOptions = {
        title: "Velg et fag",
        headerStyle: {marginTop: 24},
    };


    state = {

        isLoading: true,
        title: [],

    };
    alertItemName = (item) => {
        alert(item.name)
    };

    async componentWillMount() {
        let fbData = FireBase.getInstance();
        let studie = await getStudies(firebase.auth().currentUser.uid);
        this.setState({title: studie});
        this.setState({isLoading: false});
        console.log(this.state.title, "test");

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View><Text>Loading...</Text></View>
            )
        }
        return (
            <ScrollView>
                <Text>Main page</Text>
                <CustomListView itemList={this.state.title}/>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create ({
   container: {
      padding: 30,
      marginTop: 5,
      backgroundColor: '#ff6650',
      alignItems: 'center',
      borderWidth: 0.3,
      borderColor: 'black',

   },
   text: {
      color: '#ffffff',
      fontSize: 20,
   }
});
