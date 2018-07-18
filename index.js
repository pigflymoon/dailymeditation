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
                tabColor = colors.blue1;
                break;
            case 'MeditationTab':
                tabColor = colors.purple;
                break;
            case 'SettingsTab' :
                tabColor = colors.purple4;
                break;
            default:
                tabColor = colors.blue1
        }
        this.setState({tabColor: tabColor})
        // return tabColor
    }

    componentDidMount() {
        console.log('called ')

    }

    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:this.state.tabColor}}>
                <App tabBg={this.state.tabColor} getCurrentTab={this.handleCurrentTab}/>
            </SafeAreaView>


        )
    }
}

AppRegistry.registerComponent(appName, () => Root);
