import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";

import * as firebase from 'firebase';
import FireBase from '../components/FireBase';


 var groupList = [];

 function getGroups(userId){

    firebase.database().ref('users/' + userId+'/groups')
      .once("value").then(function (snapshot){
        snapshot.forEach(function(childSnapshot) {
          firebase.database().ref('Groups/'+childSnapshot.key)
          .once("value").then(function(childSnapshot){
            groupList.push({
              id: childSnapshot.key,
              groupName: childSnapshot.val().subject,
            });
          });
        });
      });
}

function printGroups(){
  if (groupList.length == 0) {
    console.log("Error");
  }
  for(var i = 0; i < groupList.length; i++){
    console.log(groupList[i].groupName);
  }
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

   alertItemName = (item) => {
      alert(item)
   }
   render() {
     //printGroups();

     var SampleNameArray = ["Test", "Programmering"];

   return (
     <View style={styles.MainContainer}>

         { SampleNameArray.map((item, key)=>(
         <Text key={key} style={styles.TextStyle} onPress={ this.alertItemName.bind(this, item) }> { item } </Text>)
         )}

     </View>
   );
 }
}

const styles = StyleSheet.create({

 MainContainer: {
   flex: 1,
   margin: 10

 },

 TextStyle:{
   fontSize : 25,
    textAlign: 'center'
 }

});
