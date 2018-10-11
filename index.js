import React, {Component} from 'react';
import {
    AppRegistry,
    SafeAreaView,
    View,

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

        this.state = {
            tabColor : colors.purple
        }
    }
    handleCurrentTab = (type) => {
        var tabColor;
        console.log('type is ', type)
        switch (type) {
            case 'HomeTab' :
                tabColor = colors.purple;//blue1
                break;
            case 'MeditationTab':
                tabColor = colors.purple;
                break;
            case 'SettingsTab' :
                tabColor = colors.purple;//purple4
                break;
            default:
                tabColor = colors.purple//blue1
        }
        this.setState({tabColor: tabColor})
    }

    componentDidMount() {
        console.log('called ')

    }

    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:this.state.tabColor}}>
                <App/>
            </SafeAreaView>


        )
    }
}

AppRegistry.registerComponent(appName, () => Root);

