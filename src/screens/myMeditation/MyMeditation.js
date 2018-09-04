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
    AsyncStorage
} from 'react-native'
import {Overlay, Avatar, ListItem, Icon, Button} from 'react-native-elements';
// import Video from 'react-native-video';
// import {VibrancyView, BlurView} from 'react-native-blur';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import baseStyle from '../../styles/base';
import screenStyle from '../../styles/screen';
// import musicPlayerStyle from '../../styles/musicPlayer';
import meditationStyle from '../../styles/meditation';

import colors from '../../styles/colors';


import SortablePlayList from '../../components/SortablePlayList';
const deviceInfo = {
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24
}


// const musicData = [{
//     "audioType": "being present",
//     "downloadUrl": "https://firebasestorage.googleapis.com/v0/b/daily-meditation-dev.appspot.com/o/beginner%2FbeingPresent%2F1?alt=media&token=3edf6e51-a943-4888-b001-2da7d007d1bb",
//     "imageDownloadUrl": "https://firebasestorage.googleapis.com/v0/b/daily-meditation-dev.appspot.com/o/beginnerImage%2FbeingPresent%2F1?alt=media&token=6f3fd8d3-a0b4-4e62-a706-17fdf8524edb",
//     "name": "1"
// }
//     , {
//         "audioType": "being present",
//         "downloadUrl": "https://firebasestorage.googleapis.com/v0/b/daily-meditation-dev.appspot.com/o/beginner%2FbeingPresent%2F2?alt=media&token=d5c91eaa-d126-45c4-9ffa-3757f2506648",
//         "imageDownloadUrl": "https://firebasestorage.googleapis.com/v0/b/daily-meditation-dev.appspot.com/o/beginnerImage%2FbeingPresent%2F2?alt=media&token=9f6d1d22-0e93-475b-a8a5-1c20ee6450f8",
//         "name": "2"
//     }
//
// ];


// const musicData = [{
//     audioType: "being present",
//     downloadUrl: "https://firebasestorage.googleapis.com/v0/b/daily-meditation-dev.appspot.com/o/beginner%2FbeingPresent%2F1?alt=media&token=3edf6e51-a943-4888-b001-2da7d007d1bb",
//     imageDownloadUrl: "https://firebasestorage.googleapis.com/v0/b/daily-meditation-dev.appspot.com/o/beginnerImage%2FbeingPresent%2F1?alt=media&token=6f3fd8d3-a0b4-4e62-a706-17fdf8524edb",
//     name: "1"
// }
//     , {
//         audioType: "being present",
//         downloadUrl: "https://firebasestorage.googleapis.com/v0/b/daily-meditation-dev.appspot.com/o/beginner%2FbeingPresent%2F2?alt=media&token=d5c91eaa-d126-45c4-9ffa-3757f2506648",
//         imageDownloadUrl: "https://firebasestorage.googleapis.com/v0/b/daily-meditation-dev.appspot.com/o/beginnerImage%2FbeingPresent%2F2?alt=media&token=9f6d1d22-0e93-475b-a8a5-1c20ee6450f8",
//         name: "2"
//     }
//
// ];
export default class MyMeditation extends Component {

    constructor(props) {
        super(props)
        this.player = '';
        this.rotation = false;

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

    playAllList = () => {
        this.props.navigation.push("MusicPlayer", {audio: this.state.musicList});//audioArray
    }

    deleteAllList = () => {
        Alert.alert(
            'Delete all list',
            `Are you sure to delete all list?`,
            [
                {
                    text: 'OK', onPress: () => {
                    this.setState({
                        musicList: []
                    })
                },
                },
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            {cancelable: false}
        )

    }

    componentWillMount() {
        var self = this;
        AsyncStorage.getItem("myPlayList")
            .then(req => {
                console.log('req is :', req);
                return JSON.parse(req)
            })
            .then((myList) => {
                if (myList) {
                    console.log('my list is ', myList);
                    self.setState({
                        musicList: myList,
                        isLoading: false,
                    })
                }
            })
    }


    render() {
        console.log('music list is :', this.state.musicList);
        const {isLoading, musicList} = this.state;

        return (
            <View style={[baseStyle.container, screenStyle.screenBgPurple]}>
                <View style={{ flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                paddingVertical: 5,
                }}>
                    <Icon
                        containerStyle={{marginRight:10}}
                        name='play-circle-outline'
                        color={colors.grey6}
                        onPress={this.playAllList}/>
                    <Icon
                        containerStyle={{marginRight:10}}
                        name='delete-forever'
                        color={colors.grey4}
                        size={26}
                        onPress={this.deleteAllList}
                    />
                </View>
                {this.state.isLoading ? <View><Text>Loading...</Text></View> :
                    <SortablePlayList isLoading={isLoading} musicData={musicList} navigate={this.props.navigation}/>}


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
