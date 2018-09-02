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
import {Overlay, Avatar, ListItem, Icon, Button} from 'react-native-elements';
import Video from 'react-native-video';
import {VibrancyView, BlurView} from 'react-native-blur';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import baseStyle from '../styles/base';
import screenStyle from '../styles/screen';
import musicPlayerStyle from '../styles/musicPlayer';
import colors from '../styles/colors';
import mockData from '../config/musicList.json';
import bg from '../assets/images/1.jpg';

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
const list2 = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
        linearGradientColors: ['#FF9800', '#F44336'],
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
        linearGradientColors: ['#3F51B5', '#2196F3'],
    },
    {
        name: 'Amanda Martin',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: 'CEO',
        linearGradientColors: ['#FFD600', '#FF9800'],
    },
    {
        name: 'Christy Thomas',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
        subtitle: 'Lead Developer',
        linearGradientColors: ['#4CAF50', '#8BC34A'],
    },
    {
        name: 'Melissa Jones',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg',
        subtitle: 'CTO',
        linearGradientColors: ['#F44336', '#E91E63'],
    },
];

export default class PlayList extends Component {

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

    //right  header
    static navigationOptions = ({navigation}) => {
        return ({
            headerRight: (
                <Icon
                    containerStyle={{marginRight:10}}
                    name='queue-music'
                    color={colors.grey6}
                    onPress={() => console.log('hello')}/>

            )
        });


    };

    componentWillMount() {
        const {audio} = this.props.navigation.state.params;
        console.log('audio list is*********** ', audio)

        console.log('audio is*********** ', audio[this.state.currentIndex])
        console.log('music list is',audio);
        this.setState({musicList: audio})

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
                color: colors.grey4
        }
    }

                leftAvatar={{size: 'medium', source: {uri: imageDownloadUrl}}}
                rightIcon={{
            name: 'ios-lock-outline',
                type: 'ionicon',
                color: colors.grey4
        }}
                key={index}
                title={name}
                titleStyle={{color: colors.grey4,}}
                containerStyle={{
                    backgroundColor:'transparent',
                    paddingVertical: 10,
                    marginVertical: 4,
        }}
                bottomDivider
            />


        );
    }

    renderListCards() {
        let musicList = this.state.musicList;

        return musicList.map((item, index) => {
            return this.renderCard(item, index);

        })
    }

    renderPlayList = () => {
        // let musicData = this.state.musicList[this.state.currentIndex]
        return (
            <View style={styles.bgContainer}>
                <ScrollView style={{flex: 1, marginBottom: 20}}>
                    <View
                        style={{flex: 1, flexDirection: 'column', backgroundColor:'rgba(46,49,87 , 1)', alignItems: 'center', height: 160, marginBottom: 10}}>
                        <View style={{flex: 3, flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Avatar
                                    size="large"
                                    rounded
                                    source={bg}
                                    onPress={() => console.log("Works!")}
                                    activeOpacity={0.7}
                                />
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{ flex: 1, marginTop: 10, justifyContent: 'center'}}>
                                    <Text
                                        style={{fontSize: 16, color: colors.grey4, marginLeft: -15}}>
                                        Paul Allen
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{width: 300, borderWidth: 0.5, borderColor: 'rgba(222, 223, 226, 1)', marginHorizontal: 20, height: 1, marginVertical: 10}}/>

                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1,}}>
                                <Icon
                                    name='share'
                                    color={colors.grey4}
                                    onPress={() => console.log('hello')}/>
                            </View>

                            <View style={{flex: 1,}}>
                                <Icon
                                    name='file-download'
                                    color={colors.grey4}
                                    onPress={() => console.log('hello')}/>
                            </View>

                        </View>
                    </View>
                    <View style={{flex: 1, padding: 10,}}>
                        <View style={[styles.navBarWrapper]}>
                            <MaterialIcons
                                name='play-circle-outline'
                                color={colors.grey4}
                                size={26}
                            />
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.title}>{`Play All`}</Text>
                            </View>
                        </View>

                        <View style={{flex: 1, marginTop: 10, flexDirection: 'column'}}>
                            {this.renderListCards()}
                        </View>

                    </View>
                </ScrollView>

            </View>
        )
    }

    render() {
        // const musicList = this.state.musicList || [];
        // const musicData = musicList[this.state.currentIndex]

        return (
            <View style={[baseStyle.container, screenStyle.screenBgPurple]}>

                {this.renderPlayList()}

            </View>
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
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: colors.grey4
    },
    title: {
        color: colors.grey4,
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