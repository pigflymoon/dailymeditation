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
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import {Overlay, ListItem, Icon} from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../styles/colors';

const window = Dimensions.get('window');

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
const data = {
    0: {
        image: 'https://placekitten.com/200/240',
        text: 'Chloe',
    },
    1: {
        image: 'https://placekitten.com/200/201',
        text: 'Jasper',
    },
    2: {
        image: 'https://placekitten.com/200/202',
        text: 'Pepper',
    },
    3: {
        image: 'https://placekitten.com/200/203',
        text: 'Oscar',
    },
    4: {
        image: 'https://placekitten.com/200/204',
        text: 'Dusty',
    },
    5: {
        image: 'https://placekitten.com/200/205',
        text: 'Spooky',
    },
    6: {
        image: 'https://placekitten.com/200/210',
        text: 'Kiki',
    },
    7: {
        image: 'https://placekitten.com/200/215',
        text: 'Smokey',
    },
    8: {
        image: 'https://placekitten.com/200/220',
        text: 'Gizmo',
    },
    9: {
        image: 'https://placekitten.com/220/239',
        text: 'Kitty',
    },
};

export default class SortablePlayList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            musicListVisible: false,
        };
    }

    _renderRow = ({data, active}) => {
        return <Row data={data} active={active} dropMenu={this.onHandleDropMenu}/>
    }

    onHandleDropMenu = (value) => {
        this.setState({musicListVisible: value});
    }

    render() {
        return (
            <View style={styles.container}>

                <SortableList
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    data={data}
                    renderRow={this._renderRow}/>
                <Overlay
                    overlayBackgroundColor='rgba(255, 255, 255, .9)'
                    overlayStyle={{flex: 1,zIndex:99, position: 'absolute', bottom: 250, width: '100%', right: 0, height: 360}}
                    isVisible={this.state.musicListVisible}
                    borderRadius={0}
                    onBackdropPress={() => this.setState({musicListVisible: false})}
                >
                    <View style={{flex: 1,}}>
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
                            />
                            <ListItem
                                leftIcon={{name: 'ios-share-outline',type: 'ionicon',color: colors.purple3}}
                                title={`Share`}
                                titleStyle={{color: colors.purple3,}}
                                containerStyle={{backgroundColor:'transparent',paddingVertical: 10, marginVertical: 4,}}
                                bottomDivider
                            />
                            <ListItem
                                leftIcon={{name: 'ios-remove-outline',type: 'ionicon',color: colors.purple3}}
                                title={`Delete`}
                                titleStyle={{color: colors.purple3,}}
                                containerStyle={{backgroundColor:'transparent',paddingVertical: 10, marginVertical: 4,}}
                                bottomDivider
                            />
                        </View>


                    </View>
                </Overlay>
            </View>
        );
    }

}

class Row extends Component {

    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);

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
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }


    showDropDownMenu = () => {
        this.props.dropMenu(true);
        // this.setState({musicListVisible: true})
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
        const {data, active} = this.props;

        return (
            <Animated.View style={[
                styles.row,
                this._style,
            ]}>
                <Icon
                    containerStyle={{flex: 1,}}
                    iconStyle={{alignSelf:'flex-start'}}
                    style={{width:30}}
                    name='ios-musical-note'
                    type='ionicon'
                    color={colors.grey4}
                    onPress={() => console.log('hello')}/>
                <Image source={{uri: data.image}} style={styles.image}/>
                <View style={{flex:1,flexGrow:3}}>
                    <Text style={styles.text}>{data.text}'kkkkkkkkkkkk'</Text>
                </View>
                <Icon
                    containerStyle={{flex: 1,}}
                    iconStyle={{alignSelf:'flex-end'}}
                    color={colors.grey4}
                    name='more-vert'
                    onPress={this.showDropDownMenu}/>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#eee',

        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },

    title: {
        fontSize: 20,
        // paddingVertical: 20,
        // color: '#999999',
        color: colors.purple3,
    },

    list: {
        flex: 1,
    },

    contentContainer: {
        width: window.width,

        ...Platform.select({
            ios: {
                paddingHorizontal: 10,
            },

            android: {
                paddingHorizontal: 0,
            }
        })
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#fff',
        padding: 5,
        // height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        // borderRadius: 4,
        borderBottomWidth: 0.5, borderColor: 'rgba(222, 223, 226, 1)',

        ...Platform.select({
            ios: {
                // width: window.width - 30 * 2,

                // shadowColor: 'rgba(0,0,0,0.2)',
                // shadowOpacity: 1,
                // shadowOffset: {height: 2, width: 2},
                // shadowRadius: 2,
            },

            android: {
                width: window.width - 30 * 2,
                elevation: 0,
                marginHorizontal: 30,
            },
        })
    },

    image: {
        width: 50,
        height: 50,
        marginRight: 5,
        borderRadius: 25,
    },

    text: {
        // fontSize: 24,
        color: colors.grey4
    },
});
