import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import FireBase from "./FireBase";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        marginTop: 10, 
    },
    rowContainer: {
        padding: 30,
        backgroundColor: '#5D1049',
        alignItems: 'center', 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        height: 100,
        borderColor: 'black',
        marginTop: 7,
        margin: 5,
    },
    title: {
        color: '#ffffff',
        fontSize: 22,
    }
});

const CustomRow = ({ title }) => (
    <TouchableOpacity
        onPress={async () => {
            await FireBase.getInstance().joinGroup(firebase.auth().currentUser.uid, title);
            //this.props.navigation.navigate('Gruppe');
        }}>
        <View style={styles.rowContainer}>
            <Text
                style={styles.title}>
                {title}
            </Text>
        </View>
    </TouchableOpacity>
);

const CustomListView = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={({ item }) => <CustomRow
                title={item.title}
            />}
        />
    </View>
);

export default CustomListView;
