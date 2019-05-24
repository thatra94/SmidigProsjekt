import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase';
import FireBase from '../components/FireBase';
import CustomListView from "../components/CustomListView";

export default class Fag extends React.Component {
    constructor(props) {
        super(props);
    };

    static navigationOptions = {
        title: "Velg et fag",
        headerStyle: {marginTop: 35}, 
        headerStyle: {
        
        fontSize: 25,    
        backgroundColor: '#f2f2f2',
        borderBottomColor:'transparent',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        
    },
        
        headerTitleStyle: {
        fontSize: 24, 
    },
    };

    state = {
        title: [],

    };
    alertItemName = (item) => {
        alert(item.name)
    };

    async componentWillMount() {
        let fbData = FireBase.getInstance();
        await this.setState({title: fbData.getSubjectList()});
        console.log(this.state.title, "test");
    }

   render() {
   return (
     <View style={styles.MainContainer}>

         <ScrollView>
         <CustomListView itemList={this.state.title}/>
         </ScrollView>

     </View>
   );
 }
}


const styles = StyleSheet.create ({
    
   MainContainer: {
       flex: 1,
       margin: 0, 
       backgroundColor: '#f2f2f2',
   },
    
   text: {
      color: '#ffffff',
      fontSize: 20,
   }
});
