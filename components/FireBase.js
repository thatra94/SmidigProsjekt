import React from 'react';
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyA8WS2uhrgoz0ldb-Uke0Uz0fv_cVfQehU",
    authDomain: "smidigprosjekt-e3cdc.firebaseapp.com",
    databaseURL: "https://smidigprosjekt-e3cdc.firebaseio.com",
    projectId: "smidigprosjekt-e3cdc",
    storageBucket: "smidigprosjekt-e3cdc.appspot.com",
};

firebase.initializeApp(firebaseConfig);

let groupList = [];
const subjectsList = [];
let firstName;
let lastName;
let userStudie;

export default class FireBase {


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

        FireBase.addToGroup(key, userId, 0);
    }

    mountStudy(userId){
        firebase.database().ref('users/' + userId)
            .once("value").then(function (snapshot){
            userStudie = snapshot.val().studieretning;
            console.log(userStudie);
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

    getStudy(){
        return userStudie;
    }

    getGroups(userId){
        //groupList.length = 0;
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

        firebase.database().ref("Groups/")
            .once("value").then(function (snapshot) {
            snapshot.forEach(function (snapshot) {
                var userCount = snapshot.val().userCount;
                var groupKey = snapshot.key;
                console.log(snapshot.val().title);
                if (!groupList.includes(groupKey)) {
                    if (userCount < 3) {
                        FireBase.addToGroup(groupKey, userId, userCount);
                        groupFull = true;
                        return true;
                    } else {
                        groupFull = false;
                    }
                }
            });
            if (!groupFull) {
                FireBase.createNewGroup(userId, subjectName);
            }
        });
        this.getGroups(userId);
    }

}