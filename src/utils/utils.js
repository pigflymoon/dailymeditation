import React, {Component} from 'react';

import {
    Alert,
    ImageBackground,
    View,
} from 'react-native';
import {Text, Card} from 'react-native-elements';

import showInfo from '../styles/showInfo';
import bg from '../assets/images/noWifiBg.png';


export default class Utils {
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
                    width: null,
                    height: 290,
                }}
            >
                <View style={showInfo.container}>
                    <Text style={showInfo.text}>Please add any favorite meditaions to My Meditation.{"\n"}{"\n"}
                        Tap favorite on any meditation session.</Text>



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