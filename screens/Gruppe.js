import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";

import FireBase from '../components/FireBase';
import firebase from "./Kollokvie";
import CustomListView from "../components/CustomListView";

export default class Grupper extends React.Component {
  constructor(props){
    super(props);
  }

    state = {
        groupName: []

    };

  static navigationOptions = {
      title: "Dine Grupper",
      headerStyle: { marginTop: 24 },
    };

   alertItemName = (item) => {
      alert(item)
   }

    async componentWillMount() {
        let fbData = FireBase.getInstance();
        await this.setState({groupName: fbData.getGroupList()});
        console.log(this.state.groupName);
    }

   render() {
   return (
     <View style={styles.MainContainer}>

         <ScrollView>
         <CustomListView itemList={this.state.groupName}/>
         </ScrollView>

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
