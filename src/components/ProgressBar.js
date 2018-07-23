import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import {Slider} from 'react-native-elements'
import {formatTime} from '../utils/utils';
import playerStyle from '../styles/player';
import colors from '../styles/colors';


class ProgressBar extends ProgressComponent {
    getSeekValue = (progress) => (value) => {
        console.log('progress is', progress, 'value is', value);
        this.props.handleSeekTo((value + progress) * 100);
    }

    render() {
        const position = formatTime(Math.floor(this.state.position));
        const duration = formatTime(Math.floor(this.state.duration));
        const info = position + ' / ' + duration;

        let progress = this.getProgress()// * 100;

        return (
            <View style={playerStyle.container}>

                <Slider
                    style={playerStyle.progressBarContainer}
                    minimumTrackTintColor={colors.red}
                    value={progress}
                    maximumValue={1}
                    onValueChange={this.getSeekValue(progress)}/>


                <View style={playerStyle.infoContainer}><Text
                    style={playerStyle.info}>{info}</Text></View>
            </View>
        );
    }

}


module.exports = ProgressBar;