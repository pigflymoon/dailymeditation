import React, {Component} from 'react';
import {observer} from 'mobx-react';
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    Icon,
} from 'react-native-elements';
import Player from '../../components/Player';
import playlistData from '../../config/playlist.json';

import PlayerStore from '../../stores/Player';

import playerListStyle from '../../styles/playerList';
@observer
export default class PlayList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            ]
        });
    }

    togglePlayback = async() => {
        console.log('#########playback state is #########', PlayerStore.playbackState)
        if (PlayerStore.playbackState === TrackPlayer.STATE_STOPPED) {
            console.log('player is stopped!!!');
            TrackPlayer.reset();
            // await TrackPlayer.add(playlistData);
            // TrackPlayer.play()
        } else {
            const currentTrack = await TrackPlayer.getCurrentTrack();
            if (currentTrack == null) {
                TrackPlayer.reset();
                console.log('first  reset then add!!')
                await TrackPlayer.add(playlistData);
                TrackPlayer.play();
            } else {
                if (PlayerStore.playbackState === TrackPlayer.STATE_PAUSED) {
                    TrackPlayer.play();
                }
                else {
                    TrackPlayer.pause();
                }
            }
        }

    }

    skipToNext = async() => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack == null) {

            TrackPlayer.reset();
            await TrackPlayer.add(playlistData);
        }
        console.log('TrackPlayer state  is ', TrackPlayer.getState())
        try {

            await TrackPlayer.skipToNext()
        } catch (_) {
            console.log('error TrackPlayer is ', TrackPlayer)
            console.log('error current Track is ', currentTrack)
            console.log('skip next error reset!!!')
            // TrackPlayer.reset();
        }
    }

    skipToPrevious = async() => {
        try {
            const currentTrack = await TrackPlayer.getCurrentTrack();
            if (currentTrack == null) {
                TrackPlayer.reset();
                await TrackPlayer.add(playlistData);
            }
            await TrackPlayer.skipToPrevious()
        } catch (_) {
            console.log('skip previous error reset!!!')
            TrackPlayer.reset();
        }
    }
    seekTo = async(value) => {
        // await TrackPlayer.add(...)
        // await TrackPlayer.skip(...)
        console.log('seek to value ', value)
        TrackPlayer.seekTo(value)
    }


    goBack = () => {
        const {navigation} = this.props;
        navigation.goBack();
    }

    render() {
        console.log('@@@@@ render playback state is @@@@@@', PlayerStore.playbackState)

        return (
            <View style={playerListStyle.container}>
                <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: 20,
                        marginTop: 30,
                    }}>
                    <Icon
                        name='close'
                        size={28}
                        onPress={this.goBack}
                    />

                </View>
                <View style={playerListStyle.playerContainer}>
                    <Text style={playerListStyle.description}>
                        7 Days of Calm Meditation
                    </Text>
                    <Player
                        style={playerListStyle.player}
                        onNext={() => this.skipToNext()}
                        onPrevious={() => this.skipToPrevious()}
                        onTogglePlayback={() => this.togglePlayback()}
                        onSeekTo={this.seekTo}
                    />
                    <Text style={playerListStyle.state}>{PlayerStore.playbackState}</Text>
                </View>

            </View>
        );
    }
}
