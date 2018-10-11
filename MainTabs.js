/**
 * @flow
 */

import React from 'react';
import {ScrollView, Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
//Home
// import HomeScreen from './src/screens/home/Home';
//Meditation
import MeditationScreen from './src/screens/meditation/Meditation';
//auth
import SigninScreen from './src/screens/auth/Signin';
import SignupScreen from './src/screens/auth/Signup';
import ResetPasswordScreen from './src/screens/auth/ResetPassword';
import ConfirmEmailScreen from './src/screens/auth/ConfirmEmail';
//Settings
import SettingsScreen from './src/screens/settings/Settings';
import AboutScreen from './src/screens/settings/About';
// import MedidationAudioModalScreen from './src/screens/meditation/MedidationAudioModal';
import MusicPlayerScreen from './src/components/MusicPlayer' // './src/screens/meditation/PlayList';
//PlayList
import PlayListScreen from './src/components/PlayList';
//My Meditation
import MyMeditationScreen from './src/screens/myMeditation/MyMeditation';

import CustomTabBar from './src/components/CustomTabBar';
import UnLockModalScreen from './src/screens/settings/UnLockModal';

import colors from './src/styles/colors';


const MyMeditationTab = createStackNavigator({
    MyMeditation: {
        screen: MyMeditationScreen,
        navigationOptions: ({navigation, screenProps}) => ({
            title: 'My Meditation',
            headerStyle: {backgroundColor: colors.purple},
            headerTitleStyle: {color: colors.grey6}
        }),
    },
});

const MeditationTab = createStackNavigator({

        Meditation: {
            screen: MeditationScreen,
            navigationOptions: ({navigation, screenProps}) => ({
                title: 'Meditation',
                headerStyle: {backgroundColor: colors.purple},
                headerTitleStyle: {color: colors.grey6}
            }),
        },
        PlayList: {
            screen: PlayListScreen,
            navigationOptions: ({navigation, screenProps}) => ({
                title: 'Play List',
                headerStyle: {backgroundColor: colors.purple},
                headerTitleStyle: {color: colors.grey6},
                headerTintColor: colors.grey6,

            }),
        },

    }
);


const AuthTab = createStackNavigator({
        Signin: {
            screen: SigninScreen,
            navigationOptions: ({navigation, screenProps}) => ({
                title: 'Sign In',
                headerStyle: {backgroundColor: colors.purple},
                headerTitleStyle: {color: colors.grey6}
            }),
        },
        Signup: {
            screen: SignupScreen,
            navigationOptions: ({navigation, screenProps}) => ({
                title: 'Sign Up',
                headerStyle: {backgroundColor: colors.purple},
                headerTitleStyle: {color: colors.grey6},
                headerLeft: null,

            }),
        },
        ResetPassword: {
            screen: ResetPasswordScreen,
            navigationOptions: ({navigation, screenProps}) => ({
                title: 'Reset Password',
                headerStyle: {backgroundColor: colors.purple},
                headerTitleStyle: {color: colors.grey6},
                headerLeft: null,

            }),
        },
        ConfirmEmail: {
            screen: ConfirmEmailScreen,
            navigationOptions: ({navigation, screenProps}) => ({
                title: 'Confirm email',
                headerStyle: {backgroundColor: colors.purple},
                headerTitleStyle: {color: colors.grey6},
                headerLeft: null,

            }),
        },


    }
);
const SettingsTab = createStackNavigator({
    Settings: {
        screen: SettingsScreen,
        navigationOptions: ({navigation, screenProps}) => ({
            title: 'Settings',//#F6F6F5
            headerStyle: {backgroundColor: colors.purple},
            headerTitleStyle: {color: colors.grey6}

        }),
    },
    About: {
        screen: AboutScreen,
        navigationOptions: ({navigation, screenProps}) => ({
            title: 'About',
            headerStyle: {backgroundColor: colors.purple},
            headerTitleStyle: {color: colors.grey6}
        }),
    },
});

const StacksInTabs = createBottomTabNavigator(
    {
        AuthTab: {
            screen: AuthTab,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? 'ios-person' : 'ios-person-outline'}
                        size={30}
                        style={{color: tintColor}}
                    />
                ),
            },
        },

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

        MyMeditationTab: {
            screen: MyMeditationTab,
            navigationOptions: {
                tabBarLabel: 'My Meditation List',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? 'ios-flower' : 'ios-flower-outline'}
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
        tabBarComponent: CustomTabBar,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: colors.green,
            inactiveTintColor: colors.grey6,
            iconStyle: colors.grey6,
            // style: {
            //     backgroundColor: colors.purple //'#071441'//colors.purple,
            // },
        }

    },
);

const StacksOverTabs = createStackNavigator({
        Root: {
            screen: StacksInTabs,
        },
        MusicPlayer: {
            screen: MusicPlayerScreen,
            navigationOptions: {
                title: 'Meditation Music Player',
            },
        },
        UnLock: {
            screen: UnLockModalScreen,
            navigationOptions: {
                title: 'UnLock',
            },
        },

        // MedidationAudioModal: {
        //     screen: MedidationAudioModalScreen,
        //     navigationOptions: {
        //         title: 'Meditation Audio',
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
