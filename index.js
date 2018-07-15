import React, {Component} from 'react';
import {
    AppRegistry,
    SafeAreaView,

} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import baseStyle from './src/styles/base';

class Root extends Component {
    render() {
        return (
            <SafeAreaView style={baseStyle.container}>
                <App/>
            </SafeAreaView>
        )
    }
}

AppRegistry.registerComponent(appName, () => Root);
