import React from 'react';
import firebase from 'firebase';
import * as snapshot from "expo";


const firebaseConfig = {
  apiKey: "AIzaSyA8WS2uhrgoz0ldb-Uke0Uz0fv_cVfQehU",
  authDomain: "smidigprosjekt-e3cdc.firebaseapp.com",
  databaseURL: "https://smidigprosjekt-e3cdc.firebaseio.com",
  projectId: "smidigprosjekt-e3cdc",
  storageBucket: "gs://smidigprosjekt-e3cdc.appspot.com/",
};

firebase.initializeApp(firebaseConfig);

const groupList = [];
const subjectsList = [];
let firstName;
let lastName;
let userStudie;


export default class FireBase {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            console.log("firebase apps already running...")
        }
    }


  static myInstance = null;

  static getInstance(){
    if(FireBase.myInstance == null){
      FireBase.myInstance = new FireBase();
    }
    return this.myInstance;
  }

  mountElements(){
      getGroups(firebase.auth().currentUser.uid);
      getSubjects(firebase.auth().currentUser.uid);
      mountName(firebase.auth().currentUser.uid);
      mountStudy(firebase.auth().currentUser.uid);
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
     const key = firebase.database().ref("Groups/")
         .push({
             userCount: 0,
             subject: subjectName,
             userToken: true,
             Token: userId,
             [userId]: true
         }).key;

     this.addToGroup(key, userId, 0);
}

  mountStudy(userId){
      firebase.database().ref('users/' + userId)
      .once("value").then(function (snapshot){
          userStudie = snapshot.val().studieretning;
          return userStudie;
        });
  }
  mountName(userId){
      firebase.database().ref('users/'+userId)
          .once("value").then(function (snapshot) {
            firstName = snapshot.val().fornavn;
            lastName = snapshot.val().etternavn;
      });
  }
  getName(){
      return firstName +" "+ lastName;
  }

  getStudy(userId){
      return userStudie;
  }

  getGroups(userId){

     firebase.database().ref('users/' + userId+'/groups')
       .once("value").then(function (snapshot){
         snapshot.forEach(function(childSnapshot) {
           firebase.database().ref('Groups/'+childSnapshot.key)
           .once("value").then(function(childSnapshot){
             groupList.push({
               id: childSnapshot.key,
               title: childSnapshot.val().subject,
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
   for(let i = 0; i < groupList.length; i++){
     console.log(groupList[i].title);
   }
 }

getGroupList(){
   //console.log(groupList);
   return groupList;
 }

getSubjectList() {
   return subjectsList;
}

joinGroup(userId, subjectName) {
    let groupFull = false;

    const query = firebase.database().ref("Groups/")
        .once("value").then(function (snapshot) {
            snapshot.forEach(function (snapshot) {
                var userCount = snapshot.val().userCount;
                var groupKey = snapshot.key;
                if (userCount < 3) {
                    this.addToGroup(groupKey, userId, userCount);
                    groupFull = true;
                    return true;
                } else {
                    groupFull = false;
                }
            });
            if (!groupFull) {
                this.createNewGroup(userId, subjectName);
            }
        });
    //this.getGroups(userId);
    }

    uploadImage = async uri => {
        console.log('got image to upload. uri:' + uri);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const ref = firebase
                .storage()
                .ref('avatar')
                .child(uuid.v4());
            const task = ref.put(blob);

            return new Promise((resolve, reject) => {
                task.on(
                    'state_changed',
                    () => {
                        /* noop but you can track the progress here */
                    },
                    reject /* this is where you would put an error callback! */,
                    () => resolve(task.snapshot.ref.getDownloadURL())
                );
            });
        } catch (err) {
            console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
        }
    }

    updateAvatar = (url) => {
        //await this.setState({ avatar: url });
        let userf = firebase.auth().currentUser;
        if (userf != null) {
            userf.updateProfile({ avatar: url})
                .then(function() {
                    console.log("Updated avatar successfully. url:" + url);
                    alert("Avatar image is saved successfully.");
                }, function(error) {
                    console.warn("Error update avatar.");
                    alert("Error update avatar. Error:" + error.message);
                });
        } else {
            console.log("can't update avatar, user is not login.");
            alert("Unable to update avatar. You must login first.");
        }
    };



    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }


    get ref() {
        return firebase.database().ref('Messages');
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: id } = snapshot;
        const { key: _id } = snapshot; //needed for giftedchat
        const timestamp = new Date(numberStamp);

        const message = {
            id,
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };

    refOn = callback => {
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    // send the message to the Backend
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                createdAt: this.timestamp,
            };
            this.ref.push(message);
        }
    };

    refOff() {
        this.ref.off();
    }


}