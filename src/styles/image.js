import colors from './colors';

export default {
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        height: 180,
    },
    imageRadiusBorder: {
        borderRadius: 5
    },
    imageGradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    text: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.white,
       marginBottom: 10,
        textTransform:'capitalize',
    },
    subtitle: {
        fontSize: 12,
        color: colors.grey5,
    },
}