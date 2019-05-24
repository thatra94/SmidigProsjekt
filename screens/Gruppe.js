import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";

import FireBase from '../components/FireBase';
import firebase from "./Kollokvie";
import GroupListView from "../components/GroupListView";

export default class Grupper extends React.Component {
  constructor(props){
    super(props);
  }

    state = {
        title: []

    };

  static navigationOptions = {
      title: "Dine Grupper",
      headerStyle: { marginTop: 24 },
      headerStyle: {
          
      backgroundColor: '#f2f2f2',
          borderBottomColor:'transparent',
          borderBottomWidth: 0,
          shadowColor: 'transparent',
    },
    };

   alertItemName = (item) => {
      alert(item)
   }

    async componentWillMount() {
        let fbData = FireBase.getInstance();
        await this.setState({title: fbData.getGroupList()});
        console.log(this.state.title);
    }

   render() {
   return (
     <View style={styles.MainContainer}>

         <ScrollView>
         <GroupListView itemList={this.state.title}/>
         </ScrollView>

     </View>
   );
 }
}

const styles = StyleSheet.create({

 MainContainer: {
     flex: 1,
     margin: 0,
     backgroundColor: '#f2f2f2',


 },

 TextStyle:{
   fontSize : 25,
   textAlign: 'center',   
 }

});
