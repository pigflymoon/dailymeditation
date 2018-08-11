import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, StatusBar, TouchableHighlight} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

// import SlideTabBar from './SlideTabBar';
import GridCardView from '../../components/GridCardView';
import colorStyle from '../../styles/colors';

import baseStyle from '../../styles/base';
import screenStyle from '../../styles/screen';
import sliderTabStyle from '../../styles/slideTab';


export default class Meditation extends Component {

    renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
        console.log('page', page)
        return <TouchableHighlight
            key={`${name}_${page}`}
            onPress={() => onPressHandler(page)}
            onLayout={onLayoutHandler}
            style={{flex: 1, width: 100,}}
            underlayColor="#aaaaaa"
        >

            <Text>{`${name}-test`}</Text>
        </TouchableHighlight>;

    }

    render() {
        return (
            <View style={[baseStyle.container, screenStyle.screenBgPurple]}>
                <ScrollableTabView
                    initialPage={0}
                    tabBarInactiveTextColor={colorStyle.white}
                    tabBarActiveTextColor={colorStyle.orange}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <ScrollView tabLabel="Beginner" style={sliderTabStyle.tabView}>
                        <GridCardView category="beginner" type="all" {...this.props}/>
                    </ScrollView>
                    <ScrollView tabLabel="Meditation" style={sliderTabStyle.tabView}>
                        <View style={sliderTabStyle.card}>
                            <Text>Friends</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="Anxiety" style={sliderTabStyle.tabView}>
                        <GridCardView category="meditationCategory" type="anxiety" {...this.props}/>
                    </ScrollView>
                    <ScrollView tabLabel="Stress" style={sliderTabStyle.tabView}>
                        <GridCardView category="meditationCategory" type="stress" {...this.props}/>
                    </ScrollView>
                    <ScrollView tabLabel="Focus" style={sliderTabStyle.tabView}>
                        <GridCardView category="meditationCategory" type="focus" {...this.props}/>
                    </ScrollView>


                </ScrollableTabView>
            </View>
        )
        console.log('Meditation??')
    }
}
