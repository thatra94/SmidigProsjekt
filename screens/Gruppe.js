import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";

import * as firebase from 'firebase';
import FireBase from '../components/FireBase';

 var groupList = [];

 function getGroups(userId){

    firebase.database().ref('users/' + userId+'/groups')
      .once("value").then(function (snapshot){
        snapshot.forEach(function(snapshot) {
          firebase.database().ref('Groups/'+snapshot.key)
          .once("value").then(function(snapshot){
            groupList.push({
              id: snapshot.key,
              groupName: snapshot.val().subject,
            });
          });
        });
      });
}


export default class Grupper extends React.Component {
  constructor(){
    super();
    getGroups(firebase.auth().currentUser.uid);
  }

    static navigationOptions = {
      title: "Dine Grupper",
      headerStyle: { marginTop: 24 },
    }

   state = {
     liste: [
       {
         id: 0,
         name: "Smidig Prosjekt",
         medlemmer: "Thanh, Fredrik og 2 til"
       },
       {
         id: 1,
         name: "Programmering",
         medlemmer: "Jonas og Erlend"
       }
     ]
   }

   alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      return (
         <ScrollView>
            {
               this.state.liste.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress={() => {

                      }
                     }
                  >
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                     <Text style = {styles.text2}>
                        {item.medlemmer}
                     </Text>
                  </TouchableOpacity>
               ))
            }
         </ScrollView>
      )
   }
}

const styles = StyleSheet.create ({
   container: {
      padding: 30,
      marginTop: 0,
      backgroundColor: '#ff6650',
      alignItems: 'center',
      borderWidth: 0.3,
      height: 150,
      borderColor: 'black',
      margin: 5,

   },

   text: {
      color: '#ffffff',
      fontSize: 20,
   },
   text2: {
      color: '#ffffff',
      fontSize: 12,
      marginTop: 10,
   }
})
