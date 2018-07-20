import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import trackBg from '../assets/images/1.jpg';
import trackAudio from '../assets/audio/1.mp3';
export default class AudioModal extends Component {
    playAudio = () => {
        TrackPlayer.setupPlayer().then(async() => {

            // Adds a track to the queue
            await TrackPlayer.add({
                id: 'trackId',
                url: trackAudio,
                title: 'Track Title',
                artist: 'Track Artist',
                artwork: trackBg
            });

            // Starts playing it
            TrackPlayer.play();

        });
    }

    render() {
        return (
            <View>
                <Ionicons
                    name={'ios-settings'}
                    size={30}
                    onPress={this.playAudio}
                />
            </View>
        )
    }
}