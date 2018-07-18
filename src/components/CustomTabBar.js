import React, {Component} from 'react';

import {TabBarBottom} from 'react-navigation';
import colors from '../styles/colors';

export default class CustomTabBar extends Component {
    getTabColor = (type) => {
        var tabColor;
        switch (type) {
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
            <TabBarBottom
                {...this.props}
                style={{backgroundColor: this.getTabColor(this.props.screenProps.currentTab)}}
            />
        )
    }
}