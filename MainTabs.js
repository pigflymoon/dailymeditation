/**
 * @flow
 */

import React from 'react';
import {ScrollView, Alert} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Home
import HomeScreen from './src/screens/home/Home';
//Meditation
import MeditationScreen from './src/screens/meditation/Meditation';
//Settings
import SettingsScreen from './src/screens/settings/Settings';
// import AboutScreen from './src/screens/settings/About';
// import UnLockModalScreen from './src/screens/settings/UnLockModal';


import colors from './src/styles/colors';


const HomeTab = StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
        },
    },
});

const MeditationTab = StackNavigator({
        Home: {
            screen: MeditationScreen,
            navigationOptions: {
                title: 'Meditation',
                headerStyle:{backgroundColor:'#484C82'}
            },
        },
    },
);

const SettingsTab = StackNavigator({
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            title: 'Settings',
        },
    },
    // About: {
    //     screen: AboutScreen,
    //     navigationOptions: {
    //         title: 'About',
    //         headerTintColor: colors.secondary2,
    //         headerTitleStyle: {color: colors.black},
    //     }
    // },
});

const StacksInTabs = TabNavigator(
    {
        MeditationTab: {
            screen: MeditationTab,
            navigationOptions: {
                tabBarLabel: 'Meditation',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? 'ios-leaf' : 'ios-leaf-outline'}
                        size={30}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        HomeTab: {
            screen: HomeTab,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? 'ios-home' : 'ios-home-outline'}
                        size={30}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        SettingsTab: {
            screen: SettingsTab,
            navigationOptions: {
                tabBarLabel: 'Settings',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? 'ios-settings' : 'ios-settings-outline'}
                        size={30}
                        style={{color: tintColor}}
                    />
                ),
            },
        },


    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {activeTintColor: colors.secondary2, style: {
            backgroundColor: colors.purple,
        },}

    },
);

const StacksOverTabs = StackNavigator({
        Root: {
            screen: StacksInTabs,
        },
        // UnLock: {
        //     screen: UnLockModalScreen,
        //     navigationOptions: {
        //         title: 'UnLock',
        //     },
        // },

    },
    {
        headerMode: 'none',
        mode: 'modal',
    }
);

export default StacksOverTabs;
console.disableYellowBox = true
console.ignoredYellowBox = ['Remote debugger'];
