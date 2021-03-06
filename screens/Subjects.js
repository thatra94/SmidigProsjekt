import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import FireBase from '../components/FireBase';

import SubjectsListView from "../components/SubjectsListView";

export default class Subjects extends React.Component {
    constructor(props) {
        super(props);
    };

    static navigationOptions = {
        title: "Velg et fag",
        headerStyle: {marginTop: 35},
        fontSize: 25,    
        backgroundColor: '#f2f2f2',
        borderBottomColor:'transparent',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        
    };

    state = {
        title: [],

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
         <SubjectsListView
             itemList={this.state.title}
             navigation={this.props.navigation}
         />
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
