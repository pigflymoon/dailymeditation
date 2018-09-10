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
        };
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
        return (
            <View>
                <Text>Home</Text>
            </View>
        );


    }
}