import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import {Image, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes} from 'react-native';
import TrackStore from '../stores/Track';
import PlayerStore from '../stores/Player';

import ProgressBar from './ProgressBar';
import playerStyle from '../styles/player';

function ControlButton({title, onPress}) {
    return (
        <TouchableOpacity style={playerStyle.controlButtonContainer} onPress={onPress}>
            <Text style={playerStyle.controlButtonText}>{title}</Text>
        </TouchableOpacity>
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
        var middleButtonText = 'Play'

        if (PlayerStore.playbackState === TrackPlayer.STATE_PLAYING
            || PlayerStore.playbackState === TrackPlayer.STATE_BUFFERING) {
            middleButtonText = 'Pause'
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
                    <ControlButton title={'<<'} onPress={onPrevious}/>
                    <ControlButton title={middleButtonText} onPress={onTogglePlayback}/>
                    <ControlButton title={'>>'} onPress={onNext}/>

                </View>
            </View>
        );
    }
}

