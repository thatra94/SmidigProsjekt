import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import firebase from 'firebase';
import FireBase from '../components/FireBase';
import CustomListView from "../components/CustomListView";

export default class Fag extends React.Component {
    constructor(props) {
        super(props);
    };

    static navigationOptions = {
        title: "Velg et fag",
        headerStyle: {marginTop: 24},
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
        if (styles.MainContainer) {
        }
        return (
            <ScrollView>
                <Text>Main page</Text>
                <CustomListView itemList={this.state.title}/>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create ({
   container: {
      padding: 30,
      marginTop: 5,
      backgroundColor: '#ff6650',
      alignItems: 'center',
      borderWidth: 0.3,
      borderColor: 'black',

   },
   text: {
      color: '#ffffff',
      fontSize: 20,
   }
});
