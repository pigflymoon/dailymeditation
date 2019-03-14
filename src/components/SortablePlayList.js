import React, {Component} from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    Platform,
    ScrollView,
    AsyncStorage
} from 'react-native';
import RNFS from 'react-native-fs';

import SortableList from 'react-native-sortable-list';
import {Overlay, ListItem, Icon, Button} from 'react-native-elements';
// import Spinner from 'react-native-spinkit';
import {auth} from '../config/FirebaseConfig';

import Ionicons from 'react-native-vector-icons/Ionicons';
import  Utils from '../utils/utils';
import Config from '../config/ApiConfig';

import colors from '../styles/colors';
import sortableListStyle from '../styles/sortableList';


export default class SortablePlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musicListVisible: false,
            musicList: this.props.musicData,
            // currentIndex: 0,
            activeIndex: 0,
            isLoading: true,
            downloadLoading: false,
            // color: "#FFFFFF",
            // size: 100,

        };
    }


    deleteListItem = () => {
        var musicData = Object.values(this.state.musicList);
        var deleteIndex = this.state.deleteIndex;

        const foundIndex = Object.values(this.state.musicList).findIndex(function (item, index) {
            return index === deleteIndex;
        });

        musicData.splice(foundIndex, 1);
        this.setState({musicList: musicData});
    }

    showMusicPlayer = (data, index) => {
        var self = this;
        const {signin} = this.props;

        if (signin) {
            self.setState({activeIndex: parseInt(index)})
            var musicData = [];
            musicData.push(data);
            self.props.navigate.push("MusicPlayer", {audio: musicData});//audioArray
        } else {
            self.props.navigate.navigate('Signin', {previousScreen: 'PlayList'});
        }

    }

    _renderRow = ({data, active, index}) => {
        // const navigate = this.props.navigate;
        const {navigate, type} = this.props;
        let isCurrentIndex = (index === this.state.activeIndex) ? true : false;
        let showAddToMylist = (type === 'playlist') ? true : false;
        let showDownload = (type === 'playlist') ? false : true;

        // let musicId = data.id;
        return <Row key={index} data={data} index={index} active={active}
                    isCurrentIndex={isCurrentIndex}
                    isDownloaded={data.isDownloaded}
                    showDownload={showDownload}
                    showAddTo={showAddToMylist}
                    navigate={navigate}
                    dropMenu={this.onHandleDropMenu(data)}/>
    }


    onHandleDropMenu = (data) => (value, deleteIndex) => {//第一个参数是直接传给调用回调函数的，第二个括号里的参数是回调函数返回的值
        this.setState({musicListVisible: value, deleteIndex: deleteIndex, musicData: data});
    }

    onShare = () => {
        var deleteIndex = this.state.deleteIndex;
        var musitItem = this.state.musicList[deleteIndex]
        const message = `I am using Daily Meditation:Simple Habit.Share this ${musitItem.name} with you,Namaste`
        const url = Config.share.applestoreUrl;
        Utils.shareText(message, url)
    }

    componentWillReceiveProps(nextProps) {
        const {musicData, isLoading} = nextProps;
        this.setState({musicList: musicData, isLoading: isLoading});

    }

    render() {
        const {musicList, musicListVisible} = this.state;
        const {type} = this.props;
        return (
            <View style={sortableListStyle.container}>
                <SortableList
                    style={sortableListStyle.list}
                    contentContainerStyle={sortableListStyle.contentContainer}
                    data={musicList}
                    onChangeOrder={(nextOrder) => {
                        console.log('next order is :', nextOrder)
                    }}
                    onPressRow={(key) => {
                        this.showMusicPlayer(musicList[key], key)
                    }}
                    renderRow={this._renderRow}/>
                <Overlay
                    overlayBackgroundColor='rgba(255, 255, 255, .9)'
                    overlayStyle={{
                        flex: 1,
                        zIndex: 99,
                        position: 'absolute',
                        bottom: 250,
                        width: '100%',
                        right: 0,
                        height: 360
                    }}
                    isVisible={musicListVisible}
                    borderRadius={0}
                    onBackdropPress={() => this.setState({musicListVisible: false})}
                >
                    <View style={{flex: 1,}}>
                        <View style={[sortableListStyle.navBarWrapper]}>
                            <Ionicons
                                name='ios-close'
                                color='gray'
                                size={30}
                                onPress={() => this.setState({musicListVisible: false})}
                            />
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={sortableListStyle.title}>{`Play List`}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <ListItem
                                leftIcon={{name: 'ios-share-outline', type: 'ionicon', color: colors.purple3}}
                                title={`Share`}
                                titleStyle={{color: colors.purple3,}}
                                containerStyle={{
                                    backgroundColor: 'transparent',
                                    paddingVertical: 10,
                                    marginVertical: 4,
                                }}
                                bottomDivider
                                onPress={this.onShare}
                            />
                            {type != 'playlist' ? <ListItem
                                    leftIcon={{
                                        name: 'ios-remove-circle-outline',
                                        type: 'ionicon',
                                        color: colors.purple3
                                    }}
                                    title={`Delete`}
                                    titleStyle={{color: colors.purple3,}}
                                    containerStyle={{
                                        backgroundColor: 'transparent',
                                        paddingVertical: 10,
                                        marginVertical: 4,
                                    }}
                                    bottomDivider
                                    onPress={this.deleteListItem}
                                /> : null}

                        </View>


                    </View>
                </Overlay>

            </View>
        )


    }

}

class Row extends Component {

    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);
        this.state = {
            musicItem: this.props.data,
            musicItemIndex: this.props.index,
            isCurrentIndex: false,
            showAddTo: this.props.showAddTo,
            showDownload: this.props.showDownload,
            isDownloaded: this.props.isDownloaded,
            downloadLoading: false,
        }

        this._style = {
            ...Platform.select({
                ios: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                        }),
                    }],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.07],
                        }),
                    }],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            musicItem: nextProps.data,
            isCurrentIndex: nextProps.isCurrentIndex,
            isDownloaded: nextProps.isDownloaded
        })//musicItemIndex: nextProps.index
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }


    showDropDownMenu = (index) => (e) => {
        this.props.dropMenu(true, index);
    }

    downloadMusicItem = () => {
        const {musicItem} = this.state;
        this.setState({downloadLoading: true,})
        var self = this;
        RNFS.downloadFile({
            fromUrl: musicItem.downloadUrl,
            toFile: `${RNFS.DocumentDirectoryPath}/${musicItem.id}.mp3`,
        }).promise.then((r) => {
            RNFS.downloadFile({
                fromUrl: musicItem.imageDownloadUrl,
                toFile: `${RNFS.DocumentDirectoryPath}/${musicItem.id}.png`,
            }).promise.then(() => {

                AsyncStorage.getItem("myPlayList")
                    .then(req => {
                        return JSON.parse(req)
                    })
                    .then((myList) => {
                        if (myList) {
                            var listIndex = myList.findIndex(el => el.id === musicItem.id)
                            myList[listIndex].isDownloaded = true;
                            myList[listIndex].downloadUrl = `${RNFS.DocumentDirectoryPath}/${musicItem.id}.mp3`;
                            myList[listIndex].imageDownloadUrl = `${RNFS.DocumentDirectoryPath}/${musicItem.id}.png`;
                            AsyncStorage.setItem('myPlayList', JSON.stringify(myList)).then(self.setState({
                                isDownloaded: true,
                                musicItem: myList[listIndex]
                            }));
                        }
                    });
                //
                this.setState({downloadLoading: false})
            })

        }).catch((err) => {
            console.log(err.message);
        });
    }

    addToMyList = (musicItem) => (e) => {
        //
        var self = this;
        AsyncStorage.getItem("myPlayList")
            .then(req => {
                return JSON.parse(req)
            })
            .then((myList) => {

                if (myList) {
                    if (myList.some(e => e.downloadUrl === musicItem.downloadUrl)) {
                        return;
                    } else {
                        myList.push(musicItem);
                    }

                } else {
                    var myList = [];
                    myList.push(musicItem)
                }

                AsyncStorage.setItem('myPlayList', JSON.stringify(myList)).then(self.setState({
                    myPlayList: myList,
                }));

            });


    }


    render() {
        const {musicItem, musicItemIndex, isCurrentIndex, showAddTo, showDownload, isDownloaded, downloadLoading} = this.state;
        return (
            <Animated.View style={[
                sortableListStyle.row,
                this._style,
            ]}>
                <Icon
                    containerStyle={{flex: 1,}}
                    iconStyle={{alignSelf: 'flex-start'}}
                    style={{width: 30}}
                    name='ios-musical-note'
                    type='ionicon'
                    color={isCurrentIndex ? colors.green : colors.grey4}
                />
                <Image source={{uri: musicItem.imageDownloadUrl}} style={sortableListStyle.image}/>
                <View style={{flex: 1, flexGrow: 3}}>
                    <Text style={sortableListStyle.text}>{musicItem.audioType}-{musicItem.name}</Text>
                </View>
                {showDownload ? isDownloaded ? <Icon
                            containerStyle={{flex: 1,}}
                            iconStyle={{alignSelf: 'flex-end'}}
                            color={colors.grey4}
                            type='ionicon'
                            name='ios-cloud-done'
                        /> : <Button
                            buttonStyle={{backgroundColor: 'transparent'}}
                            loading={downloadLoading}
                            title={null}
                            icon={<Icon
                                name='ios-cloud-download-outline'
                                type='ionicon'
                                color={colors.grey4}
                            />}
                            disabled={downloadLoading}
                            onPress={this.downloadMusicItem}
                        />
                    : null}

                {showAddTo ? <Icon
                        containerStyle={{flex: 1,}}
                        iconStyle={{alignSelf: 'flex-end'}}
                        color={colors.grey4}
                        name='add-box'
                        onPress={this.addToMyList(musicItem)}/> : null}
                <Icon
                    containerStyle={{flex: 1,}}
                    iconStyle={{alignSelf: 'flex-end'}}
                    color={colors.grey4}
                    name='more-vert'
                    onPress={this.showDropDownMenu(musicItemIndex)}/>
            </Animated.View>
        );
    }
}
