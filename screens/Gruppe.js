import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";

import FireBase from '../components/FireBase';

export default class Grupper extends React.Component {
  constructor(){
    super();
  }

    static navigationOptions = {
      title: "Dine Grupper",
      headerStyle: { marginTop: 24 },
    }

   alertItemName = (item) => {
      alert(item)
   }
   render() {
     let fbData = FireBase.getInstance();
     let GroupArray = fbData.getGroupList();
     console.log(GroupArray);
     let SampleNameArray = ["Test", "YOLOHOLO"];

   return (
     <View style={styles.MainContainer}>

         { GroupArray.groupName.map((item, key)=>(
         <Text key={key} style={styles.TextStyle} onPress={ this.alertItemName.bind(this, item) }> { item } </Text>)
         )}

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
