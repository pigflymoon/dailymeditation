import React, {Component} from 'react';

import { BottomTabBar } from 'react-navigation-tabs';

import colors from '../styles/colors';

export default class CustomTabBar extends Component {
    render() {
        return (
            <BottomTabBar
                {...this.props}
                style={{backgroundColor: colors.purple}}
            />
        )
    }
}