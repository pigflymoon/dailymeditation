import {Platform, Dimensions} from 'react-native';
import colors from './colors';
const window = Dimensions.get('window');

export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
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
    navBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: colors.purple3,
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
    },
    text: {
        color: colors.grey4
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 5,
        borderRadius: 25,
    },
}