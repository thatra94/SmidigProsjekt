import React, {Component} from 'react';
import { YellowBox } from 'react-native';
import AppContainer from './navigation/AppNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Setting a timer']);
  }
  render() {
    return (
      <AppContainer/>
    )};
  }
