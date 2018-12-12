import * as firebase from 'firebase';

var groupRef = firebase.database().ref("database/");

var userID = firebase.auth().currentUser();

export {
  userID,
  groupRef,
};
