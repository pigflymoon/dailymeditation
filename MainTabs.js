import React from 'react';
import {ScrollView, Alert, Button, View, Text} from 'react-native';

// import {createStackNavigator, createBottomTabNavigator,} from 'react-navigation';
import {
    createStackNavigator,
} from 'react-navigation';

import MyHomeScreen from './src/screens/settings/Test'
const StacksInTabs = createStackNavigator({
    Home: {
        screen: MyHomeScreen,
    },
});


export default StacksInTabs;

