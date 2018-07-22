import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import {Slider} from 'react-native-elements'
import {formatTime} from '../utils/utils';

class ProgressBar extends ProgressComponent {
    getSeekValue = (progress) => (value) => {
        console.log('progress is', progress, 'value is', value);
        this.props.handleSeekTo((value + progress) * 100);
    }

    render() {
        const position = formatTime(Math.floor(this.state.position));
        const duration = formatTime(Math.floor(this.state.duration));
        const info = position + ' / ' + duration;
        console.log('info is', info)

        let progress = this.getProgress()// * 100;
        let buffered = this.getBufferedProgress() //* 100;
        buffered -= progress;
        if (buffered < 0) buffered = 0;

        return (
            <View style={styles.view}>

                <View style={{flex: 1, alignItems: 'stretch',width: '100%', justifyContent: 'center'}}>
                    <Slider
                        value={progress}
                        maximumValue={1}
                        onValueChange={this.getSeekValue(progress)}/>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        marginBottom: 10,
    },
    info: {
        color: 'green',
        fontSize: 16,
        fontWeight: '300',
        margin: 10
    },
    bar: {
        backgroundColor: '#575757',
        height: 5,
        width: '100%',
        margin: 10,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    played: {
        backgroundColor: '#03A9F4',
        height: 5
    },
    buffered: {
        backgroundColor: '#797979',
        height: 5
    }
});

module.exports = ProgressBar;