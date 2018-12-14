import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class MenuItem extends React.Component {
    render() {
        return (
            <View style={{ height: 170, width: 75, marginTop: 50, margin: 15}}>
                <View style={{ flex: 1 }}>
                    <Image source={this.props.imageUri}
                        style={{ flex: 1, width: null, height: null}}
                    />
                </View>
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <Text style={{textAlign: 'center'}}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}
export default MenuItem;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});