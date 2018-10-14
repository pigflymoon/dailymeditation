import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Slider,
    Animated,
    Easing,
    Platform,
    findNodeHandle,
    Dimensions,
    ScrollView,
    Alert,
} from 'react-native'
import {Overlay, Avatar, ListItem, Icon, Button} from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {auth, db} from '../config/FirebaseConfig';

import baseStyle from '../styles/base';
import screenStyle from '../styles/screen';
// import musicPlayerStyle from '../../styles/musicPlayer';
import meditationStyle from '../styles/meditation';

import colors from '../styles/colors';

import SortablePlayList from '../components/SortablePlayList';


export default class PlayList extends Component {

    constructor(props) {
        super(props)
        this.player = ''
        this.rotation = false
        this.state = {
            viewRef: null,
            paused: false, // false: 表示播放，true: 表示暂停
            duration: 0.00,
            slideValue: 0.00,
            currentTime: 0.00,
            currentIndex: 0,
            playMode: 2,//random
            spinValue: new Animated.Value(0),
            playIcon: 'ios-pause',
            playModeIcon: 'ios-shuffle',
            musicInfo: {},
            musicList: [],
            deleteListVisible: false,
        }
        this.spinAnimated = Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.linear)
        })
    }

    componentWillMount() {
        const {audio} = this.props.navigation.state.params;
        console.log('audio list is*********** ', audio)
        var self = this;
        // var user = auth.currentUser;


        this.setState({musicList: audio})

    }

    componentDidMount() {

    }

    playAllList = () => {
        const {audio} = this.props.navigation.state.params;

        var self = this;
        auth.onAuthStateChanged(function (authUser) {
            console.log('authUser:',authUser);
            if (authUser) {
                var userId = auth.currentUser.uid;
                self.props.navigation.push("MusicPlayer", {audio: audio});//audioArray
            } else {
                self.props.navigation.navigate('Signin', {previousScreen: 'MusicPlayer', audio: audio});

            }
        });
    }


    render() {

        return (
            <View style={[baseStyle.container, screenStyle.screenBgPurple]}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingVertical: 5,
                }}>
                    <Icon
                        containerStyle={{marginRight: 10}}
                        name='play-circle-outline'
                        color={colors.grey6}
                        onPress={this.playAllList}/>

                </View>
                <SortablePlayList musicData={this.state.musicList} type="playlist" navigate={this.props.navigation}/>
                <Overlay
                    overlayBackgroundColor='rgba(255, 255, 255, .9)'
                    overlayStyle={meditationStyle.overlay}
                    isVisible={this.state.deleteListVisible}
                    borderRadius={0}
                    onBackdropPress={() => this.setState({deleteListVisible: false})}
                >
                    <View style={{flex: 1,}}>
                        <View style={meditationStyle.navBarWrapper}>
                            <Ionicons
                                name='ios-close'
                                color='gray'
                                size={30}
                                onPress={() => this.setState({deleteListVisible: false})}
                            />
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={meditationStyle.title}>{`Play List`}</Text>
                            </View>
                        </View>
                    </View>
                </Overlay>
            </View>
        )
    }
}
