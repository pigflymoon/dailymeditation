import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Linking,
    AppState,
    Platform,
    Item,
    TouchableOpacity,
    Alert,
    TouchableHighlight,
    Image,
    ImageBackground,
    AsyncStorage,
    Switch,

} from 'react-native';

import {ListItem,} from 'react-native-elements';
import VersionCheck from 'react-native-version-check';
import * as StoreReview from 'react-native-store-review';
import DeviceInfo from 'react-native-device-info'

import {auth, db} from '../../config/FirebaseConfig';
import probg from '../../assets/images/probg.jpg';
import graybg from '../../assets/images/bg-grey.jpg';

import {
    onRestore,
    upDateRole
} from '../../utils/AppPay';


import Config from '../../config/ApiConfig';
import Utils from '../../utils/utils';
import baseStyle from '../../styles/base';
import screenStyle from '../../styles/screen';
import colors from '../../styles/colors';
import listStyle from '../../styles/list';
export default class Settings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            version: '2.1.5',
            isPro: 'Disabled',
            versionColor: colors.grey2,
            bgImage: graybg,
            unlock: false,
            isNotified: true,
            isSilent: true,
            localeLanguage: null,
        };
    }

    onAbout = () => {
        this.props.navigation.navigate('About', {});
    };

    onShare = () => {
        const message = 'I am using Daily Meditation:Simple Habit.Bring calm and relax. Download the App for iOS, and start to meditate everyday!'
        const url = Config.share.url;
        Utils.shareText(message, url)
    }

    onRate = () => {
        let link = 'https://itunes.apple.com/nz/app/daily-meditation-simple-habit/id1420248188';
        //
        if (Platform.OS === 'ios') {
            if (StoreReview.isAvailable) {
                return StoreReview.requestReview();
            }

        }

        return Utils.goToURL(link);
    }

    titleStyle = () => {
        const {unlock} = this.state;
        if (unlock) {
            return {
                color: colors.green
            }
        } else {
            return {
                color: colors.red
            }
        }

    }

    getUserRole = () => {
        var self = this;
        auth.onAuthStateChanged(function (authUser) {
            if (authUser) {
                var userId = auth.currentUser.uid;
                db.ref('/users/' + userId).once('value').then(function (snapshot) {
                    var userrole = (snapshot.val() && snapshot.val().role) || {free_user: true, paid_user: false};
                    var isPaidUser = userrole.paid_user;
                    if (isPaidUser) {
                        self.setState({
                            // showProData: true,
                            isPro: 'Available',
                            unlock: true,
                            bgImage: probg,
                            versionColor: colors.orange,
                        });
                    }

                });
            } else {
                self.setState({
                    // showProData: false,
                    unlock: false,
                    isPro: 'Disabled'
                });
            }
        });
    }

    onUnlock = data => {
        var unlock = data.unLock;
        var unlock = true;
        if (unlock === true) {
            this.setState({
                showProData: true,
                isPro: 'Available',
                unlock: true,
                bgImage: probg,
                versionColor: colors.green,
            }, function () {
                upDateRole();
            });
        }

    };
    toggleUnlockSwitch = () => {
        this.props.navigation.navigate("UnLock", {onUnlock: this.onUnlock});
    }

    restorePurchase = () => {
        var self = this;
        onRestore().then(function (restoreResponse) {
            if (restoreResponse.restore) {
                self.setState({
                    // showProData: true,
                    isPro: 'Available',
                    unlock: true,
                    bgImage: probg,
                    versionColor: colors.green,
                });
                //update db user
                upDateRole();
                Alert.alert('Restore Successful', 'Successfully restores all your purchases.');

            }
        })

    }

    componentWillMount() {
        VersionCheck.getLatestVersion({
            provider: 'appStore'  // for iOS
        })
            .then(latestVersion => {
                this.setState({version: latestVersion})
            });
    }

    componentDidMount() {
        this.getUserRole();
    }

    render() {
        return (
            <ScrollView style={[baseStyle.container, screenStyle.screenBgPurple]}>

                <View>
                    <ImageBackground
                        source={this.state.bgImage}
                        style={{
                            flex: 1,
                            height: 120,

                        }}>

                    </ImageBackground>
                </View>
                <View style={listStyle.list}>
                    <ListItem
                        switch={{
                                value: this.state.unlock,
                                onValueChange: this.toggleUnlockSwitch,
                                }}
                        containerStyle={listStyle.listItemContainer}
                        hideChevron
                        leftIcon={{name: 'vpn-key', color: colors.purple1}}
                        title='Unlock Pro Version'
                        titleStyle={{color: colors.purple1, fontWeight: 'bold'}}


                    />
                    <ListItem
                        containerStyle={listStyle.listItemContainer}
                        bottomDivider
                        leftIcon={{name: 'refresh', color: colors.green}}
                        title='Restore Purchase'
                        titleStyle={{color: colors.white}}

                        onPress={this.restorePurchase}
                        hideChevron
                    />
                    <ListItem
                        containerStyle={listStyle.listItemContainer}
                        leftIcon={{name: 'wb-incandescent', color: this.state.versionColor}}
                        title='PRO Version'
                        titleStyle={this.titleStyle()}
                        rightTitle={this.state.isPro}
                        rightTitleStyle={this.titleStyle()}
                        hideChevron
                        bottomDivider/>
                    <ListItem
                        containerStyle={listStyle.listItemContainer}
                        titleStyle={{color: colors.white}}

                        leftIcon={{name: 'favorite', color: colors.red}}
                        title='Rate on the App Store'
                        onPress={() => this.onRate()}
                        hideChevron
                        bottomDivider
                    />
                    <ListItem
                        containerStyle={listStyle.listItemContainer}
                        titleStyle={{color: colors.white}}

                        leftIcon={{name: 'chat', color: colors.orange}}
                        title='Tell a friend'
                        onPress={() => this.onShare()}
                        hideChevron
                        bottomDivider
                    />
                    <ListItem
                        containerStyle={listStyle.listItemContainer}
                        titleStyle={{color: colors.white}}

                        leftIcon={{name: 'info', color: colors.tealBlue}}
                        title='About'
                        onPress={() => this.onAbout()}
                        chevronColor={colors.grey5}
                        bottomDivider
                    />
                    <ListItem
                        containerStyle={listStyle.listItemContainer}
                        titleStyle={{color: colors.white}}
                        leftIcon={{name: 'perm-device-information', color: colors.orange1}}
                        hideChevron
                        title='Version'
                        subtitle={this.state.version}
                    />


                </View>


            </ScrollView>
        )
    }

}
