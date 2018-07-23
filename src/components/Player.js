import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import {Image, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes} from 'react-native';
import TrackStore from '../stores/Track';
import PlayerStore from '../stores/Player';

import ProgressBar from './ProgressBar';

function ControlButton({title, onPress}) {
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Text style={styles.controlButtonText}>{title}</Text>
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
            <View style={[styles.card, style]}>
                <Image style={styles.cover} source={{ uri: TrackStore.artwork }}/>
                <ProgressBar handleSeekTo={onSeekTo}/>
                <View style={{height:50,}}>
                    <Text style={styles.title}>{TrackStore.title}</Text>
                    <Text style={styles.artist}>{TrackStore.artist}</Text>
                </View>

                <View style={styles.controls}>
                    <ControlButton title={'<<'} onPress={onPrevious}/>
                    <ControlButton title={middleButtonText} onPress={onTogglePlayback}/>
                    <ControlButton title={'>>'} onPress={onNext}/>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: '80%',
        elevation: 1,
        borderRadius: 4,
        shadowRadius: 2,
        shadowOpacity: 0.1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowColor: 'black',
        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 1},
    },
    cover: {
        width: 140,
        height: 140,
        marginTop: 20,
        backgroundColor: 'grey',
    },
    title: {
        marginTop: 10,
    },
    artist: {
        fontWeight: 'bold',
    },
    controls: {
        // height:30,
        marginVertical: 20,
        flexDirection: 'row',
    },
    controlButtonContainer: {
        flex: 1,
    },
    controlButtonText: {
        fontSize: 18,
        textAlign: 'center',
    },
});