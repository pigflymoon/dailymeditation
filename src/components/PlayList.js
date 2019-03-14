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
    ImageBackground,
} from 'react-native'
import {Overlay, Avatar, ListItem, Icon, Tile} from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {auth, db} from '../config/FirebaseConfig';

import baseStyle from '../styles/base';
import screenStyle from '../styles/screen';
// import musicPlayerStyle from '../../styles/musicPlayer';
import meditationStyle from '../styles/meditation';

import colors from '../styles/colors';

import SortablePlayList from '../components/SortablePlayList';
import bg from '../assets/images/noWifiBg.png';


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
            signin: false,
            bgImage: null,
            audioType: 'Guided Meditation For'
        }
        this.spinAnimated = Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.linear)
        })
    }

    componentDidMount() {
        const {audio} = this.props.navigation.state.params;
        this.setState({
            musicList: audio,
            audioType: 'Guided Meditation For ' + audio[0].audioType,
            bgImage: audio[0].imageDownloadUrl
        });
        var self = this;

        auth.onAuthStateChanged(function (authUser) {
            if (authUser) {
                self.setState({signin: true})
            } else {
                self.setState({signin: false})
            }
        });
    }

    playAllList = () => {
        const {audio} = this.props.navigation.state.params;

        var self = this;
        if (this.state.signin) {
            self.props.navigation.push("MusicPlayer", {audio: audio});//audioArray
        } else {
            self.props.navigation.navigate('Signin', {previousScreen: 'MusicPlayer', audio: audio});
        }

    }


    render() {
        const {musicList, signin, bgImage, audioType} = this.state;
        console.log('bgImage:', bgImage);
        let banner = bgImage ? {uri: bgImage} : bg;

        return (
            <View style={[baseStyle.container, screenStyle.screenBgPurple]}>

                <View style={{flex: 1,}}>

                    <ImageBackground
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                        source={banner}>
                        <Text style={{color: colors.grey6, fontWeight: 'bold'}}>{audioType}</Text>
                    </ImageBackground>

                    <View
                        style={{
                            flexDirection: 'row', justifyContent: 'flex-start',
                            marginVertical: 10,
                            paddingHorizontal: 10,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderBottomColor: '#A7A7AA',
                            height: 30,
                        }}
                    >
                        <Icon
                            containerStyle={{marginRight: 10}}
                            name='play-circle-outline'
                            color={colors.grey6}
                            onPress={this.playAllList}/>
                        <Text style={{color: colors.grey6}}>Play All</Text>

                    </View>
                </View>


                <SortablePlayList style={{flex: 1,}} signin={signin} musicData={musicList} type="playlist"
                                  navigate={this.props.navigation}/>
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
