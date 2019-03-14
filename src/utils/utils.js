import React, {Component} from 'react';

import {
    Alert,
    ImageBackground,
    View,
    Linking,
    Share as NativeShare,
    Dimensions

} from 'react-native';
import {Text, Card} from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width;

import showInfo from '../styles/showInfo';
import bg from '../assets/images/noWifiBg.png';


export default class Utils {
    static goToURL = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert(
                    'Network unavailable',
                    'Don\'t know how to open URI:  ${ url}',
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )

            }
        });
    }
    static validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    static validPassword = (password) => {
        var re = /^.{4,8}$/;
        return re.test(password);
    }
    static shareText = (message, url) => {
        var shareText = {
            title: 'Cardmaker App,love and share!',
            message: message,
            url: url,
            // image: imageUrl,


        };
        NativeShare.share(shareText, {
            // Android only:
            dialogTitle: 'Cardmaker App',
            // iOS only:

        })
    }

    static infoAlert = (title, info) => {
        Alert.alert(
            `${title}`,
            `${info}`,
            [
                {text: 'OK'},
            ],
            {cancelable: false}
        )
    }

    static netWorkError = () => {
        Alert.alert(
            'Network unavailable',
            `The Internet connection appears to be offline!!!`,
            [
                {text: 'OK'},
            ],
            {cancelable: false}
        )
    }
//
    static renderNoData = () => {
        return (
            <ImageBackground
                source={bg}
                style={{
                        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: 240,
        justifyContent: 'center',
        alignItems: 'center'
                }}
            >
                <View style={showInfo.container}>
                    <Text style={showInfo.text}>Please add any favorite meditaions to My Meditation.{"\n"}{"\n"}
                        Tap Add icon on any meditation session.</Text>


                </View>
            </ImageBackground >

        )
    }

}


function formatTwoDigits(n) {
    return n < 10 ? '0' + n : n;
}

/**
 * Format time to "HH:mm:ss" or "mm:ss"
 */
export function formatTime(seconds) {
    const ss = Math.floor(seconds) % 60;
    const mm = Math.floor(seconds / 60) % 60;
    const hh = Math.floor(seconds / 3600);

    if (hh > 0) {
        return hh + ':' + formatTwoDigits(mm) + ':' + formatTwoDigits(ss);
    } else {
        return mm + ':' + formatTwoDigits(ss);
    }
}