import {
    Dimensions,
} from 'react-native';
import colors from '../styles/colors';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default{
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    maskLoader: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingBackgroundStyle: {
        backgroundColor: colors.secondary4,
    },
    textWrapper: {
        paddingHorizontal: 10,
    },
    text: {
        paddingVertical: 5,
    },
    textTitle: {
        paddingVertical: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.secondary2,
    },


}