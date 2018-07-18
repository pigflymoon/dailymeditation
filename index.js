import React, {Component} from 'react';
import {
    AppRegistry,
    SafeAreaView,
    View,

} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import baseStyle from './src/styles/base';
import colors from './src/styles/colors';

class Root extends Component {
    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:colors.purple}}>
                <App tabBg={colors.purple}/>
            </SafeAreaView>


        )
    }
}

AppRegistry.registerComponent(appName, () => Root);
