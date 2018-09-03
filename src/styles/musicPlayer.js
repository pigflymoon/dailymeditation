import {Platform, Dimensions} from 'react-native';
const deviceInfo = {
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24
}
import colors from './colors';

export default {

    /** color **/
    // 常用颜色
    red: '#FF0000',
    orange: '#FFA500',
    yellow: '#FFFF00',
    green: '#00FF00',
    cyan: '#00FFFF',
    blue: '#0000FF',
    purple: '#800080',
    black: '#000',
    white: '#FFF',
    gray: '#808080',
    drakGray: '#A9A9A9',
    lightGray: '#D3D3D3',
    tomato: '#FF6347',
    PeachPuff: '#FFDAB9',
    clear: 'transparent',

    /** 主题色 **/
    themeColor: '#e74c3c',
    // 默认灰色字体颜色
    textGrayColor: '#989898',
    // 默认黑色字体颜色
    textBlockColor: '#262626',
    // 默认背景颜色
    bgColor: '#E6E6E6',
    // 默认分割线颜色
    lineColor: '#E6E6E6',
    // 默认placeholder颜色
    placeholderColor: '#eee',
    // borderColor
    borderColor: '#808080',
    // 导航title 颜色
    navTitleColor: '#262626',
    // 导航左item title color
    navLeftTitleColor: '#333',
    // 导航右item title color
    navRightTitleColor: '#333',
    navThemeColor: '#FEFEFE',
    iconGray: '#989898',
    iconBlack: '#262626',

    /** space **/
    // 上边距
    marginTop: 10,
    // 左边距
    marginLeft: 10,
    // 下边距
    marginBotton: 10,
    // 右边距
    marginRight: 10,
    // 内边距
    padding: 10,
    // 导航的leftItem的左间距
    navMarginLeft: 15,
    // 导航的rightItem的右间距
    navMarginRight: 15,

    /** width **/
    // 导航栏左右按钮image宽度
    navImageWidth: 25,
    // 边框线宽度
    borderWidth: 1,
    // 分割线高度
    lineWidth: 0.8,

    /** height **/
    // 导航栏的高度
    navHeight: Platform.OS === 'ios' ? 64 : 56,
    // 导航栏顶部的状态栏高度
    navStatusBarHeight: Platform.OS === 'ios' ? 20 : 0,
    // 导航栏除掉状态栏的高度
    navContentHeight: Platform.OS === 'ios' ? 44 : 56,
    // tabBar的高度
    tabBar: 49,
    // 底部按钮高度
    bottonBtnHeight: 44,
    // 通用列表cell高度
    cellHeight: 44,
    // 导航栏左右按钮image高度
    navImageHeight: 25,

    /** font **/
    // 默认文字字体
    textFont: 14,
    // 默认按钮文字字体
    btnFont: 15,
    // 导航title字体
    navTitleFont: 17,
    // tabBar文字字体
    barBarTitleFont: 12,
    // 占位符的默认字体大小
    placeholderFont: 13,
    // 导航左按钮的字体
    navRightTitleFont: 15,
    // 导航右按钮字体
    navLeftTitleFont: 15,

    /** opacity **/
    // mask
    modalOpacity: 0.3,
    // touchableOpacity
    taOpacity: 0.1,

    /** 定位 **/
    // absolute: 'absolute',

    /** flex **/
    around: 'space-around',
    between: 'space-between',
    center: 'center',
    row: 'row',
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
    toolBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        position: 'absolute',
        bottom: 50,
        marginVertical: 30
    },
    topNavBar: {
        marginTop: 25,
        marginHorizontal: 10
    },
    navBarStyle: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: deviceInfo.deviceWidth,
        height: 64,
        borderBottomWidth: 0.5,
        borderColor: '#E6E6E6',
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
    djCard: {
        width: 270,
        height: 270,
        marginTop: 185,
        borderColor: colors.gray,
        borderWidth: 10,
        borderRadius: 190,
        alignSelf: 'center',
        opacity: 0.2
    },
    cdImage: {
        position: 'absolute',
        top: 190,
        width: 260,
        height: 260,
        alignSelf: 'center',

    },
    cdStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    iconsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 50,
        justifyContent: 'space-around',
        bottom: -60
    }
}