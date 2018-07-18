import React, {Component} from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    NetInfo,
} from 'react-native';

import MainTabs from './MainTabs';
import  Utils from './src/utils/utils';
var tab;
export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            signin: false,
            isConnected: false,
        };

    }

    getCurrentRouteName(navigationState) {
        if (!navigationState) {
            return null;
        }

        const route = navigationState.routes[navigationState.index];
        if (route.routes) {
            var tabReg = /Tab/;

            if ((route.key).match(tabReg)) {
                tab = route.key;
            }
            return this.getCurrentRouteName(route);
        }
        console.log('route name is ', route.routeName)
        return {screen: route.routeName, tab: tab};//route.routeName;
    }

    handleConnectivityChange = (connectionInfo) => {
        let connectionType = connectionInfo.type;
        if (connectionType === 'none' || connectionType === 'unknown') {
            Utils.netWorkError();
            this.setState({
                isConnected: false
            });
        } else {
            this.setState({
                // connectionInfo: connectionType,
                isConnected: true
            });
        }

    }

    componentWillMount() {
        //Intial connection check
        var self = this;
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('fetch isConnected ', isConnected)
            if (isConnected) {
                self.setState({
                    isConnected: true
                });
            } else {
                self.setState({
                    isConnected: false
                });
            }
        });
        //Check connection change
        const handleFirstConnectivityChange = (isConnected) => {
            console.log('isConnected ', isConnected)
            this.setState({
                isConnected: isConnected
            });
            NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChange);
        };
        NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChange);
    }

    componentDidMount() {
        NetInfo.addEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );
    }

    render() {
        return (
            <MainTabs
                screenProps={{
                    signin: this.state.signin,
                    currentScreen: this.state.currentScreen,
                    isConnected: this.state.isConnected,
                    currentTab:this.state.currentTab,
                    tabBg:this.props.tabBg
                }}
                onNavigationStateChange={(prevState, currentState) => {
                    const currentScreen = this.getCurrentRouteName(currentState);
                    const prevScreen = this.getCurrentRouteName(prevState);
                    if (prevScreen.screen !== currentScreen.screen) {
                        console.log('currentScreen.tab',currentScreen.tab)
                        this.setState({currentScreen: currentScreen,currentTab:currentScreen.tab})
                    }
                }}
            />
        )
    }
}