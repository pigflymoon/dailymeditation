import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

// import Video from 'react-native-video';
import baseStyle from '../../styles/base';
import screenStyle from '../../styles/screen';

// import bgVideo from '../../assets/video/bgVideo.mp4'
export default class Home extends Component {
    render() {
        // const {shouldUpdated, ...props, } = this.props;

        return (
            <View style={[baseStyle.container,screenStyle.screenBgBlue]}>
                <Image
                    style={{width: 300, height: 200}}
                    source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}}/>
                <View style={baseStyle.container}>
                    <Text>Hello</Text>
                </View>

            </View>
        )
    }
}