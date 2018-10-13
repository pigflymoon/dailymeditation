import React, {Component} from 'react';

// import {TabBarBottom} from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import colors from '../styles/colors';

export default class CustomTabBar extends Component {
    getTabColor = (type) => {
        var tabColor;
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
        return tabColor
    }

    render() {
        return (
            <BottomTabBar
                {...this.props}
                style={{backgroundColor: colors.purple}}
            />
        )
    }
}