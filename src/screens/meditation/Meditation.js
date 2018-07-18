import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, StatusBar} from 'react-native';
import baseStyle from '../../styles/base';
import screenStyle from '../../styles/screen';

import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import SlideTabBar from './SlideTabBar';
import GridViewDemo from './GridViewDemo';
import sliderTabStyle from '../../styles/slideTab';

export default class Meditation extends Component {


    render() {
        return (
            <View style={[baseStyle.container,screenStyle.screenBgPurple]}>
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <SlideTabBar />}
                >
                    <ScrollView tabLabel="ios-paper" style={sliderTabStyle.tabView}>
                        <GridViewDemo/>
                    </ScrollView>
                    <ScrollView tabLabel="ios-people" style={sliderTabStyle.tabView}>
                        <View style={sliderTabStyle.card}>
                            <Text>Friends</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-chatboxes" style={sliderTabStyle.tabView}>
                        <View style={sliderTabStyle.card}>
                            <Text>Messenger</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-notifications" style={sliderTabStyle.tabView}>
                        <View style={sliderTabStyle.card}>
                            <Text>Notifications</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-list" style={sliderTabStyle.tabView}>
                        <View style={sliderTabStyle.card}>
                            <Text>Other nav</Text>
                        </View>
                    </ScrollView>
                </ScrollableTabView>
            </View>
        )
    }
}
