/*import React, {Component} from 'react';
import * as firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyA8WS2uhrgoz0ldb-Uke0Uz0fv_cVfQehU",
  authDomain: "smidigprosjekt-e3cdc.firebaseapp.com",
  databaseURL: "https://smidigprosjekt-e3cdc.firebaseio.com",
  projectId: "smidigprosjekt-e3cdc",
  storageBucket: "smidigprosjekt-e3cdc.appspot.com",
};


export default class FireBase extends React.Component {
  constructor() {
      firebase.initializeApp(firebaseConfig)
  };
/*
  firebase.database().ref('database/').push({
    userCount: 0,
    userToken: true
  });

  firebase.database().ref('database/-LTW_MYiTAKqEpk7MOHh').update({
    usertoken: true
  })

  var groupRef = firebase.database().ref("database/");
  var groupKey = groupRef.orderByChild('userCount').equalTo(1).on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
      console.log(data.key);
    });
  });*/
}
