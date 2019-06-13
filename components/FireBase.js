import React from 'react';
import { Alert } from 'react-native';
import firebase from 'firebase';
import uuid from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyA8WS2uhrgoz0ldb-Uke0Uz0fv_cVfQehU",
  authDomain: "smidigprosjekt-e3cdc.firebaseapp.com",
  databaseURL: "https://smidigprosjekt-e3cdc.firebaseio.com",
  projectId: "smidigprosjekt-e3cdc",
  storageBucket: "smidigprosjekt-e3cdc.appspot.com",
};

firebase.initializeApp(firebaseConfig);

const subjectsList = [];
let groupList = [];
let firstName;
let lastName;
let userStudie;

function urlToBlob(uri) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.response);
            }
        };
        xhr.open('GET', uri);
        xhr.responseType = 'blob'; // convert type
        xhr.send();
    })
}

export default class FireBase extends React.Component{
    constructor(props) {
        super(props);

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

  static addToGroup(groupKey, userId, userCount){
    firebase.database().ref('Groups/'+groupKey).update({
      Token: userId,
      userCount: userCount+1,
      [userId]: true
    });
    firebase.database().ref('users/'+userId+'/groups').update({
      [groupKey]: true
    });
}


  static createNewGroup(userId, subjectName){
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

static async removeFromGroup(userId, groupKey) {
    let newUserCount;
    await firebase.database().ref('Groups/' + groupKey).once("value").then(function (snapshot) {
        newUserCount = snapshot.val().userCount;
    });
    firebase.database().ref('Groups/' + groupKey).update({
        [userId]: null,
        userCount: newUserCount - 1
    });
    firebase.database().ref('users/' + userId + '/groups').update({
        [groupKey]: null
    });
    Alert.alert("Du har forlatt gruppen", "");
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
         while (groupList.length) {groupList.pop();}
         snapshot.forEach(function(childSnapshot) {
           firebase.database().ref('Groups/'+childSnapshot.key)
           .once("value").then(function(childSnapshot){
             groupList.push({
               id: childSnapshot.key,
               title: childSnapshot.val().subject,
             });
             console.log("antall grupper: "+groupList.length);
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


getGroupList(){
   return groupList;
 }

getSubjectList() {
   return subjectsList;
}

    async joinGroup(userId, subjectName) {

        console.log(subjectName);
        console.log(userId);
        let checkBool = false;
        let groupLength;
        await firebase.database().ref("Groups").on("value", function (snapshot) {
            console.log("There are " + snapshot.numChildren() + " Groups");
            groupLength = snapshot.numChildren();
        });
        if (groupLength === 0) {
            console.log("There are no groups in the world, you have created the first group");
            FireBase.createNewGroup(userId, subjectName);
        } else {
            firebase.database().ref("Groups/")
                .once("value").then(function (snapshot) {
                snapshot.forEach(function (snapshot) {
                    let userCount = snapshot.val().userCount;
                    let groupKey = snapshot.key;
                    let subject = snapshot.val().subject;
                    let checkedAllGroups = 0;
                    if (subjectName === subject) {
                        for (let i = 0; i < groupList.length; i++) {
                            if (groupList[i].title === (subjectName)) {
                                console.log("Already in a group for this subject");
                                Alert.alert("Du er allerede i en gruppe for "+subjectName, "Forlat den andre før du prøver å bli med i en ny");
                                checkBool = true;
                            }
                        }
                        if (!checkBool) {
                            for (let i = 0; i < groupList.length; i++) {
                                if (groupList[i].title !== (subjectName)) {
                                    if (userCount < 3 && groupLength > 0) {
                                        FireBase.addToGroup(groupKey, userId, userCount);
                                        console.log("Added user: " + userId + " \nto group: " + groupKey + " \nwith " + userCount + " users");
                                        Alert.alert(""+subjectName, "Du har blitt lagt til i en gruppe med " + userCount + " andre medlemmer");
                                        checkBool = true;
                                    } else if (checkedAllGroups > groupLength){
                                        FireBase.createNewGroup(userId, subjectName);
                                        console.log("Created new group to join, waiting for other members, and checked all groups");
                                        Alert.alert(""+subjectName, "Det var ingen ledige grupper så det har blitt laget en ny");
                                        checkBool = true;
                                    } else {
                                        checkedAllGroups++;
                                    }
                                    if(checkBool){
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (checkBool) {
                        return checkBool;
                    }
                });
                if (!checkBool) {
                    FireBase.createNewGroup(userId, subjectName);
                }
            });
        }
    }


    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }


    ref(chatId) {
        return firebase.database().ref('Groups/'+chatId+'/Chat');
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
        this.ref(FireBase.getInstance().chatId)
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
            console.log(this.ref(FireBase.getInstance().chatId));
            this.ref(FireBase.getInstance().chatId).push(message);
        }
    };

    refOff() {
        this.ref(FireBase.getInstance().chatId).off();
    }

    uploadImage = async uri => {
        console.log('got image to upload. uri:' + uri);
        try {
            const response = await urlToBlob(uri);
            //const blob = await response.blob();
            console.log("response url", response);
            const ref = firebase
                .storage()
                .ref('avatar')
                .child(uuid.v4());
            const task = await ref.put(response);
            return ref.getDownloadURL();

        } catch (err) {
            console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
        }
    };

    updateAvatar = (url) => {
        let userf = firebase.auth().currentUser;
        if (userf != null) {
            userf.updateProfile({ photoURL: url})
                .then(function() {
                    console.log("Updated avatar successfully. url:" + url);
                    alert("Profilbilde ble oppdatert.");
                }, function(error) {
                    console.warn("Error update avatar.");
                    alert("En feil oppstod med å opppdatere profilbilde" + error.message);
                });
        } else {
            console.log("can't update avatar, user is not login.");
            alert("Fikk ikke oppdatert brukerbilde.");
        }
    };

}