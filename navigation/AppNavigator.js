import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import HUBScreen from '../screens/HUBScreen';

const HUBStack = createStackNavigator({
  HUB: HUBScreen
});

const SettingsStack = createStackNavigator({
  Settings: HUBScreen
});

export default createAppContainer(createBottomTabNavigator(
  {
    HUB: HUBStack,
    HUB: SettingsStack,
  }
));
