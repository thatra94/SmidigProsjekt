import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import FireBase from "./FireBase";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        padding: 30,
        backgroundColor: '#ff6650',
        alignItems: 'center',
        borderWidth: 0.3,
        height: 150,
        borderColor: 'black',
        marginTop: 5,
    },
    title: {
        color: '#4f603c',
        fontSize: 20,
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
