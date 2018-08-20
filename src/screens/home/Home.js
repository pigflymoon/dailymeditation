import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import reactFirebase from 'react-native-firebase';
// import type { Notification, NotificationOpen }from 'react-native-firebase';
// import Video from 'react-native-video';
import baseStyle from '../../styles/base';
import screenStyle from '../../styles/screen';

// import bgVideo from '../../assets/video/bgVideo.mp4'
export default class Home extends Component {

    /*Add this Block (BEGIN) */
    componentDidMount() {
        reactFirebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    reactFirebase.messaging().getToken().then(token => {
                        console.log("LOG: ", token);
                    })
                    // user has permissions
                } else {
                    reactFirebase.messaging().requestPermission()
                        .then(() => {
                            console.log("User Now Has Permission")
                        })
                        .catch(error => {
                            console.log("Error", error)
                            // User has rejected permissions
                        });
                }
            });
    }

    /*Add this Block (END) */


    render() {

        return (
            <View style={[baseStyle.container, screenStyle.screenBgBlue]}>
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