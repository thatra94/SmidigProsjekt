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

   state = {
     groups: groupList
   }
   alertItemName = (item) => {
      alert(item.groupName)
   }
   render() {
      return (
         <ScrollView>
            {
               this.state.groups.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress={() => {
                        console.log(JSON.stringify(groupList[0]));
                      }
                     }
                  >
                     <Text style = {styles.text}>
                        {item.groupName}
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
      backgroundColor: 'blue',
      alignItems: 'center',
      borderWidth: 0.3,
      borderColor: 'black',

   },
   text: {
      color: 'white',
      fontSize: 20,
   }
})
