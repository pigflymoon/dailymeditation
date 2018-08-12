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
import mockData from '../config/musicList.json';
import bgCD from '../assets/images/bgCD.png';

const deviceInfo = {
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24
}

const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const musicListUrl = 'http://v3.wufazhuce.com:8000/api/music/bymonth/2017-10'
const musicDetail = 'http://xiamirun.avosapps.com/run?song=http://www.xiami.com/song/'

const USERS = [
    {
        name: 'How to breathe',
        avatar: 'https://images.unsplash.com/photo-1483127299475-15dad2a69465?ixlib=rb-0.3.5&s=64b764ab6649b4217350cb39c6bc4944&dpr=2&auto=format&fit=crop&w=225&q=60',
        value: '- 164'
    },
    {
        name: 'Being in Present',
        avatar: 'https://images.unsplash.com/photo-1524760205704-aaeb1d185ed8?ixlib=rb-0.3.5&s=45f0787083c73ffeabb56dbf3b0139a2&dpr=2&auto=format&fit=crop&w=225&q=60',
        value: '+ 203',
        positive: true
    },
    {
        name: 'Paying Attention',
        avatar: 'https://images.unsplash.com/photo-1454105511235-eda89ad84214?ixlib=rb-0.3.5&s=f9fdc3a8d077203f109129f951e18beb&auto=format&fit=crop&w=800&q=60',
        value: '+ 464',
        positive: true
    },
    {
        name: 'Patience',
        avatar: 'https://images.unsplash.com/photo-1532528791647-87400fc51288?ixlib=rb-0.3.5&s=815620d4ddfa6874ddd43b71997f45b9&dpr=2&auto=format&fit=crop&w=225&q=60',
        value: '- 80',
        positive: false
    },
    {
        name: 'Awareness',
        avatar: 'https://images.unsplash.com/photo-1524760205704-aaeb1d185ed8?ixlib=rb-0.3.5&s=45f0787083c73ffeabb56dbf3b0139a2&dpr=2&auto=format&fit=crop&w=225&q=60',
        value: '+ 203',
        positive: true
    },
    {
        name: 'Relax',
        avatar: 'https://images.unsplash.com/photo-1454105511235-eda89ad84214?ixlib=rb-0.3.5&s=f9fdc3a8d077203f109129f951e18beb&auto=format&fit=crop&w=800&q=60',
        value: '+ 464',
        positive: true
    },
    {
        name: 'Sleep',
        avatar: 'https://images.unsplash.com/photo-1524760205704-aaeb1d185ed8?ixlib=rb-0.3.5&s=45f0787083c73ffeabb56dbf3b0139a2&dpr=2&auto=format&fit=crop&w=225&q=60',
        value: '+ 203',
        positive: true
    },
];


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

        // currentIndex === this.state.musicList.length ? currentIndex = 0 : currentIndex
        // let newSong = this.state.musicList[currentIndex]
        // let music_id = newSong.music_id
        // if (!isNaN(parseInt(music_id))) {
        //   this.getxiamiMusic(music_id)
        //   this.setState({currentIndex})
        // } else {
        //   this.nextSong(currentIndex + 1)
        //   this.showMessageBar('抱歉')('没有找到音乐信息，已帮你切换到下一首')('error')
        // }
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
        const {title, cover} = item;
        let currentIndex = this.state.currentIndex;
        let isCurrentIndex = (currentIndex === index) ? true : false;

        return (
            <ListItem
                leftIcon={isCurrentIndex ? {
                        name: 'ios-musical-note',
                        type: 'ionicon',
                        color: colors.purple
                    } : undefined}

                leftAvatar={{size: 'medium', source: {uri: cover}}}
                rightIcon={{
                    name: 'ios-lock-outline',
                    type: 'ionicon',
                    color: colors.grey3
                }}
                key={index}
                title={title}
                titleStyle={{color: colors.grey1,}}
                containerStyle={{
                    paddingVertical: 10,
                    marginVertical: 4,
                    borderRadius: 8,
                }}
                onPress={() => this.nextSong(index)}
            />

        );
    }

    renderListCards() {
        let musicList = this.state.musicList

        return musicList.map((item, index) => {
            return this.renderCard(item, index);

        })
        // return _.map(USERS, (user, index) => {
        //     return this.renderCard(user, index);
        // });
    }

    renderPlayer = () => {
        let musicData = this.state.musicList[this.state.currentIndex]
        let musicInfo = musicData
        console.log('render Player is called~~~~~~~~~~~')
        return (
            <View style={styles.bgContainer}>
                <View style={styles.navBarStyle}>
                    <View style={[styles.topNavBar, styles.navBarWrapper]}>
                        <Ionicons
                            style={{marginTop: 5}}
                            name={'ios-close'}
                            size={30}
                            color={colors.white}
                            onPress={this.goBack}
                        />
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.title}>{musicInfo.audioType}</Text>
                            <Text style={styles.subTitle}>{musicInfo.name}</Text>
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
                    style={styles.djCard}>
                </View>
                <Image
                    style={{width: 260, height: 260, alignSelf: 'center', position: 'absolute', top: 190}}
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
                    source={{uri: musicInfo.imageDownloadUrl}}/>
                <View style={{flex: 1}}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 50,
                            justifyContent: 'space-around',
                            bottom: -60
                        }}>
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
                    <View style={styles.progressStyle}>
                        <Text
                            style={{
                                width: 35,
                                fontSize: 11,
                                color: colors.white,
                                marginLeft: 5
                            }}>{this.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                        <Slider
                            style={styles.slider}
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
                    <View style={styles.toolBar}>
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


                        <View style={styles.cdStyle}>
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
                    source={{uri: musicInfo.downloadUrl}}
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
                        <View style={[styles.navBarWrapper]}>
                            <Ionicons
                                name='ios-close'
                                color='gray'
                                size={30}
                                onPress={() => this.setState({musicListVisible: false})}
                            />
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.title}>{`Play List`}</Text>
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
        const musicData = this.state.musicInfo || {}, musicList = this.state.musicList || [];
        const data = musicList[this.state.currentIndex]

        return (
            data.downloadUrl ?
                <View style={styles.container}>
                    <Image
                        ref={(img) => {
                            this.backgroundImage = img
                        }}
                        style={styles.bgContainer}
                        source={{uri: data.imageDownloadUrl}}
                        resizeMode='cover'
                        onLoadEnd={this.imageLoaded}
                    />
                    <View style={styles.bgContainer}>
                        {
                            Platform.OS === 'ios' ?
                                <VibrancyView
                                    blurType={'light'}
                                    blurAmount={20}
                                    style={styles.container}/> :
                                <BlurView
                                    style={styles.absolute}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    bgContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: deviceInfo.deviceHeight,
        width: deviceInfo.deviceWidth
    },
    navBarStyle: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: deviceInfo.deviceWidth,
        height: 64,
        borderWidth: 0.5,
        borderColor: musicPlayerStyle.lineColor
    },
    topNavBar: {
        marginTop: 25,
        marginHorizontal: 10
    },
    navBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: colors.grey0,
        fontSize: 14
    },
    subTitle: {
        color: colors.grey0,
        fontSize: 11,
        marginTop: 5
    },
    djCard: {
        width: 270,
        height: 270,
        marginTop: 185,
        borderColor: musicPlayerStyle.gray,
        borderWidth: 10,
        borderRadius: 190,
        alignSelf: 'center',
        opacity: 0.2
    },
    playerStyle: {
        position: 'absolute',
        width: deviceInfo.deviceWidth,
    },
    progressStyle: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        position: 'absolute',
        bottom: 220
    },
    slider: {
        flex: 1,
        marginHorizontal: 5,
    },
    toolBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        position: 'absolute',
        bottom: 50,
        marginVertical: 30
    },
    cdStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
})