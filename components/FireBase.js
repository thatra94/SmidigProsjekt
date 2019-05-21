import React, {Component} from 'react';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA8WS2uhrgoz0ldb-Uke0Uz0fv_cVfQehU",
  authDomain: "smidigprosjekt-e3cdc.firebaseapp.com",
  databaseURL: "https://smidigprosjekt-e3cdc.firebaseio.com",
  projectId: "smidigprosjekt-e3cdc",
  storageBucket: "smidigprosjekt-e3cdc.appspot.com",
};

firebase.initializeApp(firebaseConfig);

var groupList = [];
var subjectsList = [];

export default class FireBase {

  static myInstance = null;

  static getInstance(){
    if(FireBase.myInstance == null){
      FireBase.myInstance = new FireBase();
    }
    return this.myInstance;
  }

 addToGroup(groupKey, userId, userCount){
    firebase.database().ref('Groups/'+groupKey).update({
      Token: userId,
      userCount: userCount+1,
      [userId]: true
    });
    firebase.database().ref('users/'+userId+'/groups').update({
      [groupKey]: true
    });
}

 createNewGroup(userId, subjectName){
  var key = firebase.database().ref("Groups/")
    .push({
    userCount: 0,
    subject: subjectName,
    userToken: true,
    Token: userId,
    [userId]: true
  }).key;

  this.addToGroup(key, userId, 0);
}

  getSubjectFromUser(userId){
    var userStudie;

    firebase.database().ref('users/' + userId)
      .once("value").then(function (snapshot){
          userStudie = snapshot.val().studieretning;
          console.log(userStudie);
        });
  }

  getGroups(userId){

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

  getSubjects(userId) {

       firebase.database().ref('users/' + userId)
            .once("value").then(function (snapshot) {
                firebase.database().ref("Studie/" + snapshot.val().studieretning)
                    .once("value").then(function (snapshot) {
                    snapshot.forEach(function (snapshot) {
                        subjectsList.push({title: snapshot.key})
                    });
                });
            });
    }

 printGroups(){
   if (groupList.length == 0) {
     console.log("Error");
   }
   for(var i = 0; i < groupList.length; i++){
     console.log(groupList[i].groupName);
   }
 }

getGroupList(){
   //console.log(groupList);
   return groupList;
 }

getSubjectList() {
   return subjectsList;
}

}
