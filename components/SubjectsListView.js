import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import FireBase from "./FireBase";
import * as firebase from "firebase";

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

const CustomRow = ({ title, navigation }) => (
    <TouchableOpacity
        onPress={async () => {Alert.alert(
            "Er du sikker?",
            "Dette legger deg til i en gruppe for dette emnet",
            [
                {text: "Avbryt", type: "cancel"},
                {text: "Fortsett", onPress: async () => {
                    await FireBase.getInstance().joinGroup(firebase.auth().currentUser.uid, title);
                    navigation.navigate("Groups");}}
            ]
        )}}>
        <View style={styles.rowContainer}>
            <Text
                style={styles.title}>
                {title}
            </Text>
        </View>
    </TouchableOpacity>
);

const SubjectsListView = ({ itemList, navigation }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={({ item }) => <CustomRow
                title={item.title}
                navigation={navigation}
            />}
            keyExtractor={(item, index) => index.toString()}

        />
    </View>
);

export default SubjectsListView;