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
import Ionicons from 'react-native-vector-icons/Ionicons';
// import  Utils from '../utils/utils';

import colors from '../styles/colors';
import sortableListStyle from '../styles/sortableList';


export default class SortablePlayList extends Component {
    constructor(props) {
        super(props);
        console.log('pass props is :', this.props.musicData);
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


    downloadMusicItem = () => {
        const {musicData} = this.state;
        this.setState({downloadLoading: true,})
        RNFS.downloadFile({
            fromUrl: musicData.downloadUrl,
            toFile: `${RNFS.DocumentDirectoryPath}/${musicData.id}.mp3`,
        }).promise.then((r) => {
            console.log('response is :', r, 'music id is: ', musicData.id);
            // musicData.isDownloaded = true;
            //
            var self = this;
            AsyncStorage.getItem("myPlayList")
                .then(req => {
                    console.log('req is :', req);
                    return JSON.parse(req)
                })
                .then((myList) => {
                    console.log('save in storage :', myList);
                    // myList = myList
                    if (myList) {
                        //
                        var listIndex = myList.findIndex(el => el.id === musicData.id)
                        console.log('list is download? ', myList[listIndex].isDownloaded);
                        // myList[myList.findIndex(el => el.id === musicData.id)] = item;
                        myList[listIndex].isDownloaded = true;
                        // console.log('changed myList is ',myList);
                        AsyncStorage.setItem('myPlayList', JSON.stringify(myList)).then(self.setState({myPlayList: myList}));
                    }
                });
            //
            this.setState({downloadLoading: false})
        }).catch((err) => {
            console.log(err.message);
        });
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
        this.setState({activeIndex: parseInt(index)})
        var musicData = [];
        musicData.push(data);
        this.props.navigate.push("MusicPlayer", {audio: musicData});//audioArray
    }

    _renderRow = ({data, active, index}) => {
        // const navigate = this.props.navigate;
        const {navigate, type} = this.props;
        let isCurrentIndex = (index === this.state.activeIndex) ? true : false;
        let showAddToMylist = (type === 'playlist') ? true : false;
        let showDownload = (type === 'playlist') ? false : true;

        let musicId = data.id;
        console.log('data isDownloaded ', data.isDownloaded);
        console.log('musicId is ', musicId);
        return <Row key={index} data={data} index={index} active={active}
                    isCurrentIndex={isCurrentIndex}
                    isDownloaded={data.isDownloaded}
                    showDownload={showDownload}
                    showAddTo={showAddToMylist}
                    navigate={navigate}
                    dropMenu={this.onHandleDropMenu(data)}/>
    }


    onHandleDropMenu = (data) => (value, deleteIndex) => {//第一个参数是直接传给调用回调函数的，第二个括号里的参数是回调函数返回的值
        console.log('music data', data, 'value, deleteIndex', value, deleteIndex);
        this.setState({musicListVisible: value, deleteIndex: deleteIndex, musicData: data});
    }

    componentWillReceiveProps(nextProps) {
        const {musicData, isLoading} = nextProps;
        // console.log('music data is :', musicData);
        this.setState({musicList: musicData, isLoading: isLoading})
    }

    render() {
        const {musicList, musicListVisible, isLoading, downloadLoading} = this.state;
        const {type} = this.props;
        console.log('music data is :', musicList);

        return (
            <View style={sortableListStyle.container}>
                <SortableList
                    style={sortableListStyle.list}
                    contentContainerStyle={sortableListStyle.contentContainer}
                    data={musicList}
                    onChangeOrder={(nextOrder)=>{console.log('next order is :',nextOrder)}}
                    onPressRow={(key)=>{this.showMusicPlayer(musicList[key],key)}}
                    renderRow={this._renderRow}/>
                <Overlay
                    overlayBackgroundColor='rgba(255, 255, 255, .9)'
                    overlayStyle={{flex: 1,zIndex:99, position: 'absolute', bottom: 250, width: '100%', right: 0, height: 360}}
                    isVisible={this.state.musicListVisible}
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
                        <View style={{flex: 1,  flexDirection: 'column'}}>
                            <ListItem
                                leftIcon={{name: 'ios-musical-note',type: 'ionicon',color: colors.purple3}}
                                title={`Next`}
                                titleStyle={{color: colors.purple3,}}
                                containerStyle={{backgroundColor:'transparent',paddingVertical: 10, marginVertical: 4,}}
                                bottomDivider
                            />
                            <ListItem
                                leftIcon={{name: 'ios-download-outline',type: 'ionicon',color: colors.purple3}}
                                title={`Download`}
                                titleStyle={{color: colors.purple3,}}
                                containerStyle={{backgroundColor:'transparent',paddingVertical: 10, marginVertical: 4,}}
                                bottomDivider
                                onPress={this.downloadMusicItem}
                                rightElement={
                                    <View style={{ flexDirection: 'row',paddingLeft: 10,paddingTop: 5}}>
                                    {downloadLoading?  <Button
                                          loading={downloadLoading}
                                          title="test"
                                           icon={
                                            <Icon
                                              name='ios-cloud-download'
                                              type='ionicon'
                                              size={26}
                                              color={colors.purple3}
                                            />
                                          }
                                          disabled={downloadLoading}
                                        />:<Icon
                                              name='ios-cloud-done'
                                              type='ionicon'
                                              size={26}
                                              color={colors.purple3}
                                            />}

                                    </View>
                                  }
                            />
                            <ListItem
                                leftIcon={{name: 'ios-share-outline',type: 'ionicon',color: colors.purple3}}
                                title={`Share`}
                                titleStyle={{color: colors.purple3,}}
                                containerStyle={{backgroundColor:'transparent',paddingVertical: 10, marginVertical: 4,}}
                                bottomDivider
                            />
                            {type != 'playlist' ? <ListItem
                                    leftIcon={{name: 'ios-remove-circle-outline',type: 'ionicon',color: colors.purple3}}
                                    title={`Delete`}
                                    titleStyle={{color: colors.purple3,}}
                                    containerStyle={{backgroundColor:'transparent',paddingVertical: 10, marginVertical: 4,}}
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
        // console.log('nextProps isCurrentIndex is ', nextProps.isCurrentIndex);
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
        console.log('index pass to menu', index);
        this.props.dropMenu(true, index);
    }

    addToMyList = (musicItem) => (e) => {
        //
        var self = this;
        AsyncStorage.getItem("myPlayList")
            .then(req => {
                // console.log('req is :', req);
                return JSON.parse(req)
            })
            .then((myList) => {
                // console.log('save in storage :', myList);
                // myList = myList
                if (myList) {
                    if (myList.some(e => e.downloadUrl === musicItem.downloadUrl)) {
                        console.log('already have item');
                        return;
                    } else {
                        myList.push(musicItem);
                    }

                } else {
                    var myList = [];
                    myList.push(musicItem)
                }
                AsyncStorage.setItem('myPlayList', JSON.stringify(myList)).then(self.setState({myPlayList: myList}));

            });


    }

    renderListCards() {
        return list2.map((l, i) => (
            <ListItem
                leftIcon={{
            name: 'ios-musical-note',
                type: 'ionicon',
                color: colors.grey4
        }
    }

                leftAvatar={{size: 'medium', source: {uri: l.avatar_url}}}
                rightIcon={{
            name: 'ios-lock-outline',
                type: 'ionicon',
                color: colors.grey4
        }}
                key={i}
                title={l.name}
                titleStyle={{color: colors.grey4,}}
                containerStyle={{
                    backgroundColor:'transparent',
                    paddingVertical: 10,
                    marginVertical: 4,
        }}
                bottomDivider
            />
        ))
    }

    render() {
        const {musicItem, musicItemIndex, isCurrentIndex, showAddTo, showDownload, isDownloaded} = this.state;


        return (
            <Animated.View style={[
                sortableListStyle.row,
                this._style,
            ]}>
                <Icon
                    containerStyle={{flex: 1,}}
                    iconStyle={{alignSelf:'flex-start'}}
                    style={{width:30}}
                    name='ios-musical-note'
                    type='ionicon'
                    color={isCurrentIndex ? colors.green : colors.grey4}
                />
                <Image source={{uri: musicItem.imageDownloadUrl}} style={sortableListStyle.image}/>
                <View style={{flex:1,flexGrow:3}}>
                    <Text style={sortableListStyle.text}>{musicItem.audioType}-{musicItem.name}</Text>
                </View>
                {showDownload ? isDownloaded ? <Icon
                            containerStyle={{flex: 1,}}
                            iconStyle={{alignSelf:'flex-end'}}
                            color={colors.grey4}
                            type='ionicon'
                            name='ios-cloud-done'
                        /> : <Icon
                            containerStyle={{flex: 1,}}
                            iconStyle={{alignSelf:'flex-end'}}
                            color={colors.grey4}
                            type='ionicon'
                            name='ios-cloud-download-outline'
                        />
                    : null}
                {showAddTo ? <Icon
                        containerStyle={{flex: 1,}}
                        iconStyle={{alignSelf:'flex-end'}}
                        color={colors.grey4}
                        name='favorite'
                        onPress={this.addToMyList(musicItem)}/> : null}
                <Icon
                    containerStyle={{flex: 1,}}
                    iconStyle={{alignSelf:'flex-end'}}
                    color={colors.grey4}
                    name='more-vert'
                    onPress={this.showDropDownMenu(musicItemIndex)}/>
            </Animated.View>
        );
    }
}
