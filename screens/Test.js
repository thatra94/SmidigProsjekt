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
     liste:[{
       id: 0,
       name: "Smidig Prosjekt"
     },
   {
     id: 1,
     name: "Programmering"
   }]
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
      backgroundColor: '#ffd700',
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
})
