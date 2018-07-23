import colors from './colors';

export default {
//player
    card: {
        width: '80%',
        elevation: 1,
        borderRadius: 4,
        shadowRadius: 2,
        shadowOpacity: 0.1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowColor: 'black',
        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 1},
    },
    cover: {
        width: 140,
        height: 140,
        marginTop: 20,
        backgroundColor: 'grey',
    },
    title: {
        marginTop: 10,
    },
    artist: {
        fontWeight: 'bold',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        marginVertical: 20,

    },
    controlButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: colors.purple,
    },

    controlButtonText: {
        fontSize: 18,
        textAlign: 'center',
    },
    //progress bar
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        marginVertical: 10,


    },
    progressBarContainer: {
        width: '70%',
        justifyContent: 'center',
    },
    infoContainer: {
        height: 50,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    info: {
        fontSize: 12,
        color: colors.grey3
    }


}