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
                    <ScrollView tabLabel="Sleep" style={sliderTabStyle.tabView}>
                        <GridCardView category="meditationCategory" type="sleep" {...this.props}/>
                    </ScrollView>
                    <ScrollView tabLabel="Emotions" style={sliderTabStyle.tabView}>
                        <GridCardView category="meditationCategory" type="emotions" {...this.props}/>
                    </ScrollView>
                    <ScrollView tabLabel="Healing" style={sliderTabStyle.tabView}>
                        <GridCardView category="meditationCategory" type="healing" {...this.props}/>
                    </ScrollView>
                    <ScrollView tabLabel="Letting Go" style={sliderTabStyle.tabView}>
                        <GridCardView category="meditationCategory" type="lettingGo" {...this.props}/>
                    </ScrollView>
                    <ScrollView tabLabel="Inner Peace" style={sliderTabStyle.tabView}>
                        <GridCardView category="meditationCategory" type="innerPeace" {...this.props}/>
                    </ScrollView>

                </ScrollableTabView>
            </View>
        )

    }
}
