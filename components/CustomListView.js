import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

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