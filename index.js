import React, {Component} from 'react';
import {
    AppRegistry,
    SafeAreaView,
    View,

} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import baseStyle from './src/styles/base';
import colors from './src/styles/colors';
import TrackPlayer from 'react-native-track-player';

// import playHander from './src/utils/playerHandler';
// import PlayerStore, { playbackStates } from './src/stores/Player';

// import TrackStore from './src/stores/Track';

class Root extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            tabColor : colors.purple
        }
    }
    handleCurrentTab = (type) => {
        var tabColor;
        console.log('type is ', type)
        switch (type) {
            case 'HomeTab' :
                tabColor = colors.blue1;
                break;
            case 'MeditationTab':
                tabColor = colors.purple;
                break;
            case 'SettingsTab' :
                tabColor = colors.purple4;
                break;
            default:
                tabColor = colors.blue1
        }
        this.setState({tabColor: tabColor})
    }

    componentDidMount() {
        console.log('called ')

    }

    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:this.state.tabColor}}>
                <App tabBg={this.state.tabColor} getCurrentTab={this.handleCurrentTab}/>
            </SafeAreaView>


        )
    }
}

AppRegistry.registerComponent(appName, () => Root);

// TrackPlayer.registerEventHandler(async (data) => {
//     console.log('##########data  type is ',data.type)
//
//     if (data.type === 'playback-track-changed') {
//         if (data.nextTrack) {
//             const track = await TrackPlayer.getTrack(data.nextTrack);
//             TrackStore.title = track.title;
//             TrackStore.artist = track.artist;
//             TrackStore.artwork = track.artwork;
//         }else{
//             console.log('player reset!!')
//             // TrackPlayer.reset();
//         }
//     } else if(data.type == 'remote-play') {
//         TrackPlayer.play()
//     } else if(data.type == 'remote-pause') {
//         TrackPlayer.pause()
//     } else if(data.type == 'remote-next') {
//         TrackPlayer.skipToNext()
//     } else if(data.type == 'remote-previous') {
//         TrackPlayer.skipToPrevious()
//     } else if (data.type === 'playback-state') {
//         console.log('##########playbackState is ',data.state)
//
//         PlayerStore.playbackState = data.state;
//     }
// });