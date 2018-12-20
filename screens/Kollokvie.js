import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import firebase from 'firebase';
import FireBase from '../components/FireBase';

//Fire.joinGroup(firebase.auth().currentUser.uid);
fb = new FireBase;

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
       //fb.addToGroup(groupKey, userId, userCount);
     }
 });
}

export default class Fag extends React.Component {

  static navigationOptions = {
    title: "Velg et fag",
    headerStyle: { marginTop: 24 },
  }


   state = {
      names: [
         {
            id: 0,
            name: 'Databaser',
         },
         {
            id: 1,
            name: 'Programmering',
         },
         {
            id: 2,
            name: 'Digital Teknologi',
         },
         {
            id: 3,
            name: 'Informasjonssikkerhet',
         },
        {
            id: 4,
            name: 'Webprosjekt',
         },
        {
            id: 5,
            name: 'Programmering 2',
         },
        {
            id: 6,
            name: 'Algoritmer og Datastrukturer',
         },
        {
            id: 7,
            name: 'Interaksjonsdesign',
         },
        {
            id: 8,
            name: 'Animasjon',
         },
         {
           id: 9,
           name: 'Test'
         },
         {
           id: 10,
           name: 'Gruppe'
         },
         {
           id: 11,
           name: 'Hub'
         },
      ]
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      return (
         <ScrollView>
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress={() => {
                       joinGroup(firebase.auth().currentUser.uid, item.name)
                       this.props.navigation.navigate('Gruppe')}
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
      backgroundColor: '#ffffff',
      alignItems: 'center',
      borderWidth: 0.3,
      borderColor: 'black',

   },
   text: {
      color: '#4f603c',
      fontSize: 20,
   }
})
