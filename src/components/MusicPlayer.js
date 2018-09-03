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
    ScrollView
} from 'react-native'
import {Overlay, Avatar, ListItem, Icon} from 'react-native-elements';
import Video from 'react-native-video';
import {VibrancyView, BlurView} from 'react-native-blur';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import musicPlayerStyle from '../styles/musicPlayer';
import colors from '../styles/colors';
// import mockData from '../config/musicList.json';
import bgCD from '../assets/images/bgCD.png';

export default class MusicPlayer extends Component {

    constructor(props) {
        super(props)
        this.player = ''
        this.rotation = false
        // this.musicList = []
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
            musicListVisible: false,
        }
        this.spinAnimated = Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.linear)
        })
    }

    formatMediaTime = (duration) => {
        let min = Math.floor(duration / 60)
        let second = duration - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }

    spining = () => {
        if (this.rotation) {
            this.state.spinValue.setValue(0)
            this.spinAnimated.start(() => {
                this.spining()
            })
        }
    }

    spin = () => {
        console.log('spin~~~~')
        this.rotation = !this.rotation
        if (this.rotation) {
            this.spinAnimated.start(() => {
                this.spinAnimated = Animated.timing(this.state.spinValue, {
                    toValue: 1,
                    duration: 6000,
                    easing: Easing.inOut(Easing.linear)
                })
                this.spining()
            })
        } else {
            this.state.spinValue.stopAnimation((oneTimeRotate) => {
                this.spinAnimated = Animated.timing(this.state.spinValue, {
                    toValue: 1,
                    duration: (1 - oneTimeRotate) * 6000,
                    easing: Easing.inOut(Easing.linear)
                })
            })
        }
    }

    componentWillMount() {
        const {audio} = this.props.navigation.state.params;
        console.log('audio list is*********** ', audio)

        console.log('audio is*********** ', audio[this.state.currentIndex])
        this.setState({musicInfo: audio[this.state.currentIndex], musicList: audio})

    }

    componentDidMount() {
        this.spin()
        // this.setState({musicInfo: mockData.list[this.state.currentIndex]})
        // fetch(musicListUrl, {
        //   method: 'GET',
        //   headers: header
        // })
        //   .then((response) => response.json())
        //   .then((responseData) => {
        //     if (responseData.data[2].music_id) {
        //       this.musicList = responseData.data
        //       this.getxiamiMusic(responseData.data[0].music_id)
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
        //   .done()
    }

    // getxiamiMusic(musicId) {
    //   fetch(`${musicDetail}${musicId}`, {
    //     method: 'GET',
    //     headers: header})
    //     .then((response) => response.json())
    //     .then((responseData) => {
    //       console.log(responseData)
    //       this.setState({musicList: this.musicList, musicInfo: responseData})
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    //     .done()
    // }

    setDuration = (duration) => {
        console.log('data in setDuration is ', duration)

        this.setState({duration: duration.duration})
    }

    setTime = (data) => {
        console.log('data in setTime is ', data)
        let sliderValue = parseInt(this.state.currentTime)
        this.setState({
            slideValue: sliderValue,
            currentTime: data.currentTime
        })
    }

    onNextSong = (currentIndex) => (e) => {

        e.preventDefault();
        console.log('currentIndex is ', currentIndex)
        this.nextSong(currentIndex);
    }

    nextSong = (currentIndex) => {
        console.log('next song called')
        console.log('currentIndex is ', currentIndex)
        this.reset()
        this.setState({currentIndex: currentIndex >= this.state.musicList.length ? 0 : currentIndex})

    }

    preSong = (currentIndex) => {
        this.reset()
        this.setState({currentIndex: currentIndex < 0 ? this.state.musicList.length - 1 : currentIndex})

        // currentIndex === -1 ? currentIndex = this.state.musicList.length -1 : currentIndex
        // let newSong = this.state.musicList[currentIndex]
        // let music_id = newSong.music_id
        // if (!isNaN(parseInt(music_id))) {
        //   this.getxiamiMusic(music_id)
        //   this.setState({currentIndex})
        // } else {
        //   this.preSong(currentIndex - 1)
        //   this.showMessageBar('抱歉')('没有找到音乐信息，已帮你切换到下一首')('error')
        // }
    }

    reset = () => {
        this.setState({
            currentTime: 0.00,
            slideValue: 0.00,
            musicInfo: {}
        })
    }

    play = () => {
        console.log('########play called!!###########',)
        this.spin()
        this.setState({
            paused: !this.state.paused,
            playIcon: this.state.paused ? 'ios-pause' : 'ios-play'
        })
    }

    playMode = (playMode) => (e) => {
        playMode++
        playMode = playMode === 3 ? playMode = 0 : playMode
        switch (playMode) {
            case 0:
                this.setState({playMode, playModeIcon: 'ios-repeat'})//music_cycle_o
                break
            case 1:
                this.setState({playMode, playModeIcon: 'repeat-one'})//random music_single_cycle_o
                break
            case 2:
                this.setState({playMode, playModeIcon: 'ios-shuffle'})
                break
            default:
                break
        }
    }

    onEnd = () => {
        this.showMessageBar('亲！')('已帮你切换到下一首')('fuccess')
        if (this.state.playMode === 0) {
            this.nextSong(this.state.currentIndex + 1)
        } else if (this.state.playMode === 1) {
            this.player.seek(0)
        } else {
            console.log('list length', this.state.musicList.length);//mockData.list.length
            var randomIndex = Math.floor(Math.random() * this.state.musicList.length);
            console.log('random is', randomIndex);//this.musicList.length

            this.nextSong(randomIndex)
        }
    }

    videoError = (error) => {
        this.showMessageBar('播放器报错啦！')(error)('error')
    }

    showMessageBar = title => msg => type => {
        console.log('error ')
        // 报错信息
    }
    goBack = () => {
        const {navigation} = this.props;
        navigation.goBack();
    }
    showMusicList = () => {
        this.setState({musicListVisible: true})
    }

    renderValue(user) {
        const {value, positive} = user;

        if (positive) {
            return (
                <View
                    style={{
                        backgroundColor: 'rgba(220,230,218,1)',
                        width: 70,
                        height: 28,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: 10
                    }}>
                    <Ionicons
                        name='md-arrow-dropup'
                        color='green'
                        size={25}
                    />
                    <Text style={{color: 'green', fontSize: 13, marginLeft: 5}}>{value}</Text>
                </View>
            );
        } else {
            return (
                <View
                    style={{
                        backgroundColor: 'rgba(244,230,224,1)',
                        width: 70,
                        height: 28,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: 10
                    }}>
                    <Ionicons
                        name='md-arrow-dropdown'
                        color='red'
                        size={25}
                    />
                    <Text style={{color: 'red', fontSize: 13, marginLeft: 5}}>{value}</Text>
                </View>
            );
        }
    }

    renderCard(item, index) {
        const {name, imageDownloadUrl} = item;
        let currentIndex = this.state.currentIndex;
        let isCurrentIndex = (currentIndex === index) ? true : false;
//                    {isCurrentIndex ? color:colors.purple:colors.grey3}

        return (
            <ListItem
                leftIcon={{
                    name: 'ios-musical-note',
                    type: 'ionicon',
                    color: isCurrentIndex ? colors.red : colors.grey3
                }
                }

                leftAvatar={{size: 'medium', source: {uri: imageDownloadUrl}}}
                rightIcon={{
                    name: 'ios-lock-outline',
                    type: 'ionicon',
                    color: colors.grey3
                }}
                key={index}
                title={name}
                titleStyle={{color: colors.grey1,}}
                containerStyle={{
                    paddingVertical: 10,
                    marginVertical: 4,
                    borderRadius: 8,
                }}
                onPress={this.onNextSong(index)}
            />

        );
    }

    renderListCards() {
        let musicList = this.state.musicList

        return musicList.map((item, index) => {
            return this.renderCard(item, index);

        })
    }

    renderPlayer = () => {
        let musicData = this.state.musicList[this.state.currentIndex]
        console.log('render Player is called~~~~~~~~~~~musicData is : ', musicData)
        return (
            <View style={musicPlayerStyle.bgContainer}>
                <View style={musicPlayerStyle.navBarStyle}>
                    <View style={[musicPlayerStyle.topNavBar, musicPlayerStyle.navBarWrapper]}>
                        <Ionicons
                            style={{marginTop: 5}}
                            name={'ios-close'}
                            size={30}
                            color={colors.white}
                            onPress={this.goBack}
                        />
                        <View style={{alignItems: 'center'}}>
                            <Text style={musicPlayerStyle.title}>{musicData.audioType}</Text>
                            <Text style={musicPlayerStyle.subTitle}>{musicData.name}</Text>
                        </View>
                        <Ionicons
                            style={{marginTop: 5}}
                            name={'ios-share-outline'}
                            size={30}
                            color={colors.white}
                            onPress={() => alert('pop')}
                        />
                    </View>
                </View>
                <View
                    style={musicPlayerStyle.djCard}>
                </View>
                <Image
                    style={musicPlayerStyle.cdImage}
                    source={bgCD}
                />
                <Animated.Image
                    style={{
                        width: 170,
                        height: 170,
                        borderRadius: 85,
                        alignSelf: 'center',
                        position: 'absolute', top: 235,
                        transform: [{
                            rotate: this.state.spinValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }]
                    }}
                    source={{uri: musicData.imageDownloadUrl}}/>
                <View style={{flex: 1}}>
                    <View
                        style={musicPlayerStyle.iconsContainer}>
                        <Ionicons
                            style={{marginTop: 5}}
                            name={'ios-heart-outline'}
                            size={26}
                            color={colors.white}
                        />
                        <Ionicons
                            style={{marginTop: 5}}
                            name={'ios-download-outline'}
                            size={26}
                            color={colors.white}
                        />

                    </View>
                    <View style={musicPlayerStyle.progressStyle}>
                        <Text
                            style={{
                                width: 35,
                                fontSize: 11,
                                color: colors.white,
                                marginLeft: 5
                            }}>{this.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                        <Slider
                            style={musicPlayerStyle.slider}
                            value={this.state.slideValue}
                            maximumValue={this.state.duration}
                            minimumTrackTintColor={musicPlayerStyle.themeColor}
                            maximumTrackTintColor={musicPlayerStyle.iconGray}
                            step={1}
                            onValueChange={value => this.setState({currentTime: value})}
                            onSlidingComplete={value => this.player.seek(value)}
                        />
                        <View style={{width: 35, alignItems: 'flex-end', marginRight: 5}}>
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: colors.white
                                }}>{this.formatMediaTime(Math.floor(this.state.duration))}</Text>
                        </View>
                    </View>
                    <View style={musicPlayerStyle.toolBar}>
                        {this.state.playMode == 1 ?
                            <MaterialIcons
                                style={{width: 50, marginLeft: 5}}
                                name={`${this.state.playModeIcon}`}
                                size={26}
                                color={colors.white}
                                onPress={this.playMode(this.state.playMode)}
                            /> :
                            <Ionicons
                                style={{width: 50, marginLeft: 5}}
                                name={`${this.state.playModeIcon}`}
                                size={26}
                                color={colors.white}
                                onPress={this.playMode(this.state.playMode)}
                            />
                        }


                        <View style={musicPlayerStyle.cdStyle}>
                            <Ionicons
                                style={{width: 50, marginLeft: 5}}
                                name={'ios-skip-backward'}
                                size={26}
                                color={colors.white}
                                onPress={() => this.preSong(this.state.currentIndex - 1)}

                            />
                            <Ionicons
                                style={{width: 35, height: 35, justifyContent: 'center', alignItems: 'center'}}
                                name={`${this.state.playIcon}`}
                                size={26}
                                color={colors.white}
                                onPress={this.play}
                            />
                            <Ionicons
                                style={{width: 35, height: 35, justifyContent: 'center', alignItems: 'center'}}
                                name={'ios-skip-forward'}
                                size={26}
                                color={colors.white}
                                onPress={this.onNextSong(this.state.currentIndex + 1)}
                            />
                        </View>
                        <Ionicons
                            style={{width: 50, alignItems: 'flex-end', marginRight: 5}}
                            name={'ios-list'}
                            size={26}
                            color={colors.white}
                            onPress={this.showMusicList}
                        />
                    </View>
                </View>
                <Video
                    ref={video => this.player = video}
                    source={{uri: musicData.downloadUrl}}
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

                <Overlay
                    overlayBackgroundColor='rgba(223, 223, 223, .8)'
                    overlayStyle={{flex: 1, position: 'absolute', bottom: 0, width: '100%', right: 0, height: '80%'}}
                    isVisible={this.state.musicListVisible}
                    onBackdropPress={() => this.setState({musicListVisible: false})}
                >
                    <View style={{flex: 1, padding: 10,}}>
                        <View style={[musicPlayerStyle.navBarWrapper]}>
                            <Ionicons
                                name='ios-close'
                                color='gray'
                                size={30}
                                onPress={() => this.setState({musicListVisible: false})}
                            />
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={musicPlayerStyle.title}>{`Play List`}</Text>
                            </View>
                        </View>

                        <ScrollView style={{flex: 1, marginTop: 10, flexDirection: 'column'}}>
                            {this.renderListCards()}
                        </ScrollView>


                    </View>
                </Overlay>

            </View>
        )
    }

    imageLoaded = () => {
        this.setState({viewRef: findNodeHandle(this.backgroundImage)})
    }

    render() {
        const musicList = this.state.musicList || [];
        const musicData = musicList[this.state.currentIndex]

        return (
            musicData.downloadUrl ?
                <View style={musicPlayerStyle.container}>
                    <Image
                        ref={(img) => {
                            this.backgroundImage = img
                        }}
                        style={musicPlayerStyle.bgContainer}
                        source={{uri: musicData.imageDownloadUrl}}
                        resizeMode='cover'
                        onLoadEnd={this.imageLoaded}
                    />
                    <View style={musicPlayerStyle.bgContainer}>
                        {
                            Platform.OS === 'ios' ?
                                <VibrancyView
                                    blurType={'light'}
                                    blurAmount={20}
                                    style={musicPlayerStyle.container}/> :
                                <BlurView
                                    style={musicPlayerStyle.absolute}
                                    viewRef={this.state.viewRef}
                                    blurType="light"
                                    blurAmount={10}
                                />
                        }
                    </View>
                    {this.renderPlayer()}

                </View> : <View/>
        )
    }
}
