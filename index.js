import React, {Component} from 'react';
import {
    AppRegistry,
    SafeAreaView,
    View,
    Text

} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import baseStyle from './src/styles/base';
import colors from './src/styles/colors';


// import playHander from './src/utils/playerHandler';
// import PlayerStore, { playbackStates } from './src/stores/Player';

// import TrackStore from './src/stores/Track';

class Root extends Component {
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor: colors.purple}}>
               <App/>
            </SafeAreaView>


        )
    }
}

AppRegistry.registerComponent(appName, () => Root);

