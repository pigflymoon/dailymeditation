import {StyleSheet, Dimensions, Platform} from 'react-native';
import colors from '../styles/colors';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default{
    exampleContainer: {
        paddingVertical: 30,
    },

    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: colors.primary3,
        borderRadius: 5,
        height: 50,
        width: 200,
    },
    restoreButton:{
        backgroundColor: colors.secondary2,
    },
    buttonContainer: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
    },
}

