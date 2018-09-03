import colors from './colors';

export default {
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
    Overlay: {
        flex: 1,
        zIndex: 99,
        position: 'absolute',
        right: 0,
        bottom: 250,
        width: '100%',
        height: 360,


    }
}