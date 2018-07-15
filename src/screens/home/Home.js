import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Video from 'react-native-video';
import baseStyle from '../../styles/base';
import bgVideo from '../../assets/video/bgVideo.mp4'
export default class Home extends Component {
    render() {
        return (
            <View style={baseStyle.container}>
                <Video
                    source={bgVideo}
                    rate={1.0}
                    volume={1.0}
                    muted={false}
                    resizeMode={"cover"}
                    repeat
                    style={{ position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,}}
                />
                <View style={baseStyle.container}>
                    <Text>Hello</Text>
                </View>
            </View>
        )
    }
}