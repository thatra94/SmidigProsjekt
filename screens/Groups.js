import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";
import * as firebase from 'firebase';
import FireBase from '../components/FireBase';
import GroupListView from "../components/GroupListView";

export default class Groups extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        title: []
    };

    static navigationOptions = {
        title: "Dine Grupper",
        headerStyle: {
            marginTop: 24,
            backgroundColor: '#f2f2f2',
            borderBottomColor:'transparent',
            borderBottomWidth: 0,
            shadowColor: 'transparent',
        },
        headerTitleStyle: {
            fontSize: 24,
        },
    };

    async componentWillMount(){
        await this.setState({title: []});
    }

    async componentDidMount() {
        this.navListener = this.props.navigation.addListener('didFocus',async () => {
            let fbData = FireBase.getInstance();
            console.log('trying to rerender via componentdidmount');
            await this.setState({title: []});
            await fbData.getGroups(firebase.auth().currentUser.uid);
            setTimeout(async () => {await this.setState({title: fbData.getGroupList()})}, 400);
            console.log(this.state.title);
        })
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <ScrollView>
                    <GroupListView
                        itemList={this.state.title}
                        navigation={this.props.navigation}
                    />
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
