import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TrackStore from '../stores/Track';
import PlayerStore from '../stores/Player';
import colors from '../styles/colors';

import ProgressBar from './ProgressBar';
import playerStyle from '../styles/player';

function ControlButton({name, onPress}) {
    return (
        <View style={playerStyle.controlButtonContainer}>
            <View style={playerStyle.circleContainer}>
                <Ionicons
                    color={colors.white}
                    name={name}
                    size={24}
                    onPress={onPress}
                />
            </View>

        </View>

    );
}

ControlButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

@observer
export default class Player extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        onNext: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onTogglePlayback: PropTypes.func.isRequired,
    };

    static defaultProps = {
        style: {}
    };

    render() {
        const {style, onNext, onPrevious, onTogglePlayback, onSeekTo} = this.props;
        var middleButtonName = 'ios-play'

        if (PlayerStore.playbackState === TrackPlayer.STATE_PLAYING
            || PlayerStore.playbackState === TrackPlayer.STATE_BUFFERING) {
            middleButtonName = 'ios-pause'
        }
        return (
            <View style={[playerStyle.card, style]}>
                <Image style={playerStyle.cover} source={{ uri: TrackStore.artwork }}/>
                <ProgressBar handleSeekTo={onSeekTo}/>
                <View style={{height:50,}}>
                    <Text style={playerStyle.title}>{TrackStore.title}</Text>
                    <Text style={playerStyle.artist}>{TrackStore.artist}</Text>
                </View>

                <View style={playerStyle.controls}>
                    <ControlButton name='ios-skip-backward' onPress={onPrevious}/>
                    <ControlButton name={middleButtonName} onPress={onTogglePlayback}/>
                    <ControlButton name={'ios-skip-forward'} onPress={onNext}/>

                </View>
            </View>
        );
    }
}

