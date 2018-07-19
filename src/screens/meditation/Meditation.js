import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, StatusBar,TouchableHighlight} from 'react-native';
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';

import SlideTabBar from './SlideTabBar';
import GridViewDemo from './GridViewDemo';

import baseStyle from '../../styles/base';
import screenStyle from '../../styles/screen';
import sliderTabStyle from '../../styles/slideTab';



export default class Meditation extends Component {

    renderTab=(name, page, isTabActive, onPressHandler, onLayoutHandler)=> {
        console.log('page',page)
        return <TouchableHighlight
            key={`${name}_${page}`}
            onPress={() => onPressHandler(page)}
            onLayout={onLayoutHandler}
            style={{flex: 1, width: 100, }}
            underlayColor="#aaaaaa"
        >

            <Text>{`${name}-test`}</Text>
        </TouchableHighlight>;



    }
    render() {
        return (
            <View style={[baseStyle.container,screenStyle.screenBgPurple]}>
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <SlideTabBar />}
                >
                    <ScrollView tabLabel="All"  style={sliderTabStyle.tabView}>
                        <GridViewDemo/>
                    </ScrollView>
                    <ScrollView tabLabel="Meditation"  style={sliderTabStyle.tabView}>
                        <View style={sliderTabStyle.card}>
                            <Text>Friends</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="Anxiety" style={sliderTabStyle.tabView}>
                        <View style={sliderTabStyle.card}>
                            <Text>Messenger</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="Focus"  style={sliderTabStyle.tabView}>
                        <View style={sliderTabStyle.card}>
                            <Text>Notifications</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="Stresst"  style={sliderTabStyle.tabView}>
                        <View style={sliderTabStyle.card}>
                            <Text>Other nav</Text>
                        </View>
                    </ScrollView>
                </ScrollableTabView>
            </View>
        )
    }
}
