import {Dimensions} from 'react-native';
import colors from '../styles/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default {
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginView: {
        // marginTop: 50,
        backgroundColor: 'transparent',
        width: 250,
        height: 450,
    },
    loginTitle: {
        flex: 1,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 30,
    },
    plusText: {
        color: 'white',
        fontSize: 30,
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerView: {
        marginTop: 10,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        height: 50,
        width: 250,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30
    },
    formContainer: {
        backgroundColor: 'transparent',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',

    },
    cardTitle:{
        color: 'white',
    }

}