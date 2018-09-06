import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon} from 'react-native-elements';

import reactFirebase, {Notification, NotificationOpen} from 'react-native-firebase';
// Optional: Flow type
import type {RemoteMessage} from 'react-native-firebase';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';

import baseStyle from '../../styles/base';
import screenStyle from '../../styles/screen';

// import bgVideo from '../../assets/video/bgVideo.mp4'
export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            badgeNumber: 0,
            isDone: false,
        };
    }


    onDownloadImagePress = () => {
        RNFS.downloadFile({
            fromUrl: 'https://firebasestorage.googleapis.com/v0/b/daily-meditation-dev.appspot.com/o/beginner%2FbeingPresent%2F1?alt=media&token=3edf6e51-a943-4888-b001-2da7d007d1bb',
            toFile: `${RNFS.DocumentDirectoryPath}/test.mp3`,
        }).promise.then((r) => {
            console.log('response is :',r);
            this.setState({isDone: true})
        }).catch((err) => {
            console.log(err.message);
        });
    }

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
        /*

         this.notificationListener = reactFirebase.notifications().onNotification((notification) => {

         // Process your notification as required
         const {
         body,
         data,
         notificationId,
         sound,
         subtitle,
         title,
         badge
         } = notification;
         console.log("notification : ", title, body, JSON.stringify(data))
         });



         */
        var self = this;

        this.messageListener = reactFirebase.messaging().onMessage((message: RemoteMessage) => {
            // Process your message as required
            console.log('message get???', message)
        });

        this.notificationDisplayedListener = reactFirebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
            console.log('***********  onNotificationDisplayed get notification ***********???', notification);
        });


        this.notificationOpenedListener = reactFirebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            // if (self.badgeNumber == 0){
            //     self.setState({badgeNumber: notification.ios.badge});
            // }
            var badgeNumber = reactFirebase.notifications().getBadge()
                .then((number) => {
                    console.log('badgeNumber is ', number);
                });

            // reactFirebase.notifications().setBadge(0);

            const action = notificationOpen.action;

            console.log('notification opened:', notification.ios.badge, notification.body, 'title: ', notification.title)

        });


        //App Closed
        this.getInitialNotificationListener = reactFirebase.notifications().getInitialNotification()
            .then((notificationOpen: NotificationOpen) => {

                if (notificationOpen) {
                    // App was opened by a notification
                    // Get the action triggered by the notification being opened
                    reactFirebase.notifications().setBadge(0);

                    const action = notificationOpen.action;
                    // Get information about the notification that was opened
                    const notification: Notification = notificationOpen.notification;

                    console.log('App closed. notification opened:', notification, notification.body, 'title: ', notification.title)

                } else {
                    console.log('not opened',)
                }
            });


    }


    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationOpenedListener();
        this.getInitialNotificationListener();
        this.messageListener();

    }


    render() {
        const preview = this.state.isDone ? (<View>

                    <Video
                        ref={video => this.player = video}
                        source={{ uri: `file://${RNFS.DocumentDirectoryPath}/test.mp3`}}
                        volume={1.0}
                        paused={this.state.paused}
                        playInBackground={true}
                        onLoadStart={this.loadStart}
                        onLoad={this.setDuration}
                        onProgress={this.setTime}
                        onEnd={this.onEnd}
                        onError={this.videoError}
                        onBuffer={this.onBuffer}
                        onTimedMetadata={this.onTimedMetadata}/>
                </View>
            ) : <View><Text>downloding...</Text></View>;
        return (
            <View>
                <Icon
                    containerStyle={{marginRight:10}}
                    name='cloud-download'
                    onPress={this.onDownloadImagePress}/>
                {preview}
            </View>
        );


    }
}