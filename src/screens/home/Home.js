import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import reactFirebase, {Notification, NotificationOpen} from 'react-native-firebase';
// Optional: Flow type
import type {RemoteMessage} from 'react-native-firebase';
import baseStyle from '../../styles/base';
import screenStyle from '../../styles/screen';

// import bgVideo from '../../assets/video/bgVideo.mp4'
export default class Home extends Component {


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

        // this.notificationDisplayedListener = reactFirebase.notifications().onNotificationDisplayed((notification: Notification) => {
        //     // Process your notification as required
        //     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        //
        //     console.log('notification opened:', notification.ios.badge, notification.body, 'title: ', notification.title)
        //
        // });

        this.notificationOpenedListener = reactFirebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            reactFirebase.notifications().setBadge(0);
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            console.log('notification opened:', notification.ios.badge, notification.body, 'title: ', notification.title)

        });

        //App Closed
        reactFirebase.notifications().getInitialNotification()
            .then((notificationOpen: NotificationOpen) => {
                if (notificationOpen) {
                    // App was opened by a notification
                    // Get the action triggered by the notification being opened
                    reactFirebase.notifications().setBadge(0);

                    const action = notificationOpen.action;
                    // Get information about the notification that was opened
                    const notification: Notification = notificationOpen.notification;
                    console.log('App closed. notification opened:', notification.body, 'title: ', notification.title)

                }
            });

        this.messageListener = reactFirebase.messaging().onMessage((message: RemoteMessage) => {
            // Process your message as required
            alert('message is ', message);
        });


    }


    componentWillUnmount() {
        this.messageListener();
        this.notificationListener();
        this.notificationOpenedListener();
        this.notificationDisplayedListener();
    }


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