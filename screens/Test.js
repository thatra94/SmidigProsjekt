import React from "react";
import { Button, View, Text } from "react-native";

export default class Test extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>WIP: Settings</Text>
        <Button
          title="Gå til grupper"
          onPress={() => this.props.navigation.navigate('Gruppe')}
        />
      </View>
    );
  }
}
