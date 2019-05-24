import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        marginTop: 30,
    },
    rowContainer: {
        padding: 30,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        height: 110,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 10,
        margin: 25, 
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5, 
        shadowRadius: 3,
    },
    title: {
        color: '#5D1049',
        fontSize: 18,
        marginBottom: 30,
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
