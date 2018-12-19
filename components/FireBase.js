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

class FireBase {
  FireBase() {
    console.log("du har opprettet en instanse av firebase, erlend er homo");
  }
/*
 joinGroup(userId){
  var testBool = false;

  var query = firebase.database().ref("Groups/")
    .once("value").then(function(snapshot) {
      snapshot.forEach(function(snapshot) {
          var userCount = snapshot.val().userCount;
          var groupKey = snapshot.key;
          if(userCount < 3){
            addToGroup(groupKey, userId, userCount).bind(this);
            testBool = true;
            return true;
          }
          else {
            testBool = false;
          }
      });
      if (!testBool) {
        createNewGroup(userId).bind(this);
        addToGroup(groupKey, userId, userCount).bind(this);
      }
  });
}
*/

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

  getStudieFromUser(userId){
    var userStudie;

    firebase.database().ref('users/' + userId)
      .once("value").then(function (snapshot){
          userStudie = snapshot.val().studieretning;
          console.log(userStudie);
        });
  }
}


export default FireBase;
