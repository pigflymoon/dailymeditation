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
    AsyncStorage,
    ImageBackground,
} from 'react-native'
import {Overlay, Avatar, ListItem, Icon, Button} from 'react-native-elements';
import Spinner from 'react-native-spinkit';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {auth} from '../../config/FirebaseConfig';

import  Utils from '../../utils/utils';
import SortablePlayList from '../../components/SortablePlayList';

import bg from '../../assets/images/noWifiBg.png';

import colors from '../../styles/colors';
import baseStyle from '../../styles/base';
import screenStyle from '../../styles/screen';
import meditationStyle from '../../styles/meditation';


const deviceInfo = {
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24
}

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
            isLoading: true,
            color: "#FFFFFF",
            size: 100,
            bannerImage: ''
        }
        this.spinAnimated = Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.linear)
        })
    }


    getDataFromLocalStorage = () => {
        var self = this;
        AsyncStorage.getItem("myPlayList")
            .then(req => {
                return JSON.parse(req)
            })
            .then((myList) => {
                if (myList) {
                    self.setState({
                        musicList: myList,
                        isLoading: false,
                        bannerImage: myList[0].imageDownloadUrl
                    })
                } else {
                    self.setState({
                        musicList: [],
                        isLoading: false,
                    })
                }
            })
    }

    refreshList = () => {
        this.getDataFromLocalStorage();
    }

    playAllList = () => {
        if (this.state.signin) {
            if ((this.state.musicList).length > 0) {
                this.props.navigation.push("MusicPlayer", {audio: this.state.musicList});//audioArray
            } else {
                Alert.alert(
                    'Meditation list is empty',
                    `Please add any favorite meditaions to My Meditation.`,
                    [
                        {
                            text: 'OK'
                        },
                    ],
                    {cancelable: false}
                )
            }
        } else {
            this.props.navigation.navigate('Signin', {previousScreen: 'MyMeditation', audio: this.state.musicList});
        }
    }

    deleteAllList = () => {
        Alert.alert(
            'Delete all list',
            `Are you sure to delete all list?`,
            [
                {
                    text: 'OK', onPress: () => {
                    AsyncStorage.setItem('myPlayList', '');
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

    componentDidMount() {
        this.getDataFromLocalStorage();
        var self = this;

        auth.onAuthStateChanged(function (authUser) {
            if (authUser) {
                self.setState({signin: true})
            } else {
                self.setState({signin: false})
            }
        });

    }

    componentWillReceiveProps(nextProps) {
        const {isConnected} = nextProps.screenProps;
        if (!isConnected) {
            Utils.netWorkError();
            this.getDataFromLocalStorage();
        }
    }

    render() {
        const {isLoading, musicList, signin, bannerImage} = this.state;
        const {isConnected} = this.props.screenProps;
        if (!isConnected) {
            return Utils.renderOffline();
        }
        let banner = bannerImage ? {uri: bannerImage} : bg;//
        if (musicList.length == 0) {
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
                            name='refresh'
                            color={colors.grey6}
                            onPress={this.refreshList}/>
                        <Icon
                            containerStyle={{marginRight: 10}}
                            name='play-circle-outline'
                            color={colors.grey6}
                            onPress={this.playAllList}/>
                        <Icon
                            containerStyle={{marginRight: 10}}
                            name='delete-forever'
                            color={colors.grey4}
                            size={26}
                            onPress={this.deleteAllList}
                        />
                    </View>
                    {Utils.renderNoData()}
                </View>
            )
        }
        return (
            <View style={[baseStyle.container, screenStyle.screenBgPurple]}>

                <View style={{flex: 1,}}>

                    <ImageBackground
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                        source={banner}>
                        <Text style={{color: colors.grey6, fontWeight: 'bold'}}>My Daily Meditation:Simple Habit</Text>
                    </ImageBackground>

                    <View
                        style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            marginVertical: 10,
                            paddingHorizontal: 10,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderBottomColor: '#A7A7AA',
                            height: 30,
                        }}
                    >
                        <View style={{flex: 1, flexDirection: 'row',}}>
                            <Icon
                                containerStyle={{marginRight: 10}}
                                name='play-circle-outline'
                                color={colors.grey6}
                                onPress={this.playAllList}/>
                            <Text style={{color: colors.grey6}}>Play All</Text>

                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Icon
                                containerStyle={{marginRight: 10}}
                                name='refresh'
                                color={colors.grey6}
                                onPress={this.refreshList}/>
                            <Icon
                                containerStyle={{marginRight: 10}}
                                name='delete-forever'
                                color={colors.grey4}
                                size={26}
                                onPress={this.deleteAllList}
                            />
                        </View>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingVertical: 5,
                }}>

                </View>

                {this.state.isLoading ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Spinner
                        style={{marginBottom: 50}}
                        isVisible={this.state.isLoading}
                        size={this.state.size}
                        type="ThreeBounce"
                        color={this.state.color}/></View> :
                    <SortablePlayList signin={signin} isLoading={isLoading} musicData={musicList}
                                      navigate={this.props.navigation}/>}


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
