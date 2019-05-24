import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
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
    <View style={styles.rowContainer}>
        <View>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    </View>
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
