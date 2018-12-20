import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert } from "react-native";

import * as firebase from 'firebase';
import FireBase from '../components/FireBase';

export default class HomeActivity extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      GridListItems: [
        { key: "AAAA" },
        { key: "Database" },
        { key: "Kollokvie" },
        { key: "ThanhErHomo" },
      ]
    };
  }

  GetGridViewItem(item) {
    Alert.alert(item);
  }

  render() {
    return (
   <View style={styles.container}>
     <FlatList
        data={ this.state.GridListItems }
        renderItem={ ({item}) =>
          <View style={styles.GridViewContainer}>
           <Text style={styles.GridViewTextLayout} onPress={this.GetGridViewItem.bind(this, item.key)} > {item.key} </Text>
           <Text style={styles.GridViewTextMemberLayout}> medlemmer:Fredrik </Text>
          </View> }
        numColumns={2}
     />
   </View>
 );
}

}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
backgroundColor: "#e5e5e5"
},
headerText: {
fontSize: 20,
textAlign: "center",
margin: 10,
fontWeight: "bold"
},
GridViewContainer: {
flex:1,
justifyContent: 'center',
alignItems: 'center',
height: 200,
margin: 5,
backgroundColor: 'dodgerblue'
},
GridViewTextLayout: {
fontSize: 20,
fontWeight: 'bold',
justifyContent: 'center',
color: '#fff',
padding: 10,
},

GridViewTextMemberLayout: {
fontSize: 10,
fontWeight: 'bold',
justifyContent: 'center',
color: '#fff',
padding: 10,
}
});
