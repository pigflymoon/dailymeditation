import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import { ListItem} from 'react-native-elements';
import Label from './Label';
import Utils from '../utils/utils';
import colors from '../styles/colors';
import listStyle from '../styles/list';

export default class Copyright extends Component {

    render() {
        const bsdProjects = [];

        const mitProjects = [
            {
                name: 'react',
                link: 'https://github.com/facebook/react',
            },
            {
                name: 'react-native',
                link: 'https://github.com/facebook/react-native',
            },
            {
                name: 'react-native-elements',
                link: 'https://github.com/react-native-training/react-native-elements',
            },
            {
                name: 'react-navigation',
                linke: 'https://github.com/react-community/react-navigation'
            },
            {
                name: 'axios',
                linke: 'https://github.com/mzabriskie/axios'
            },
            {
                name: 'react-native-share',
                link: 'https://github.com/EstebanFuentealba/react-native-share',
            },

            {
                name: 'react-native-vector-icons',
                link: 'https://github.com/oblador/react-native-vector-icons',
            },
            {
                name: 'react-native-store-review',
                link: 'https://github.com/oblador/react-native-store-review',
            },
            {
                name: 'react-native-super-grid',
                link: 'git@github.com:saleel/react-native-super-grid.git'
            },

            {
                name: 'react-native-snap-carousel',
                link: 'https://github.com/archriss/react-native-snap-carousel'
            },
            {
                name: 'react-native-version-check',
                link: 'https://github.com/kimxogus/react-native-version-check'
            },
            {
                name: 'react-native-video',
                link: 'https://github.com/react-native-community/react-native-video'
            },
            {
                name: 'react-navigation-tabs',
                link: 'https://github.com/react-navigation/react-navigation-tabs'
            },
            {
                name: 'react-native-linear-gradient',
                link: 'https://github.com/react-native-community/react-native-linear-gradient'
            },
            {
                name: 'react-native-fs',
                link: 'https://github.com/itinance/react-native-fs'
            },
            {
                name: 'react-native-scrollable-tab-view',
                link: 'https://github.com/happypancake/react-native-scrollable-tab-view'
            },
            {
                name: 'react-native-blur',
                link: 'https://github.com/react-native-community/react-native-blur'
            },
            {
                name: 'react-native-spinkit',
                link: 'https://github.com/maxs15/react-native-spinkit'
            },
            {
                name:'react-native-in-app-utils',
                link:'https://github.com/chirag04/react-native-in-app-utils'
            }
        ];

        return (
            <View>
                {mitProjects.length > 0 ?
                    <View>
                        <Label text="MIT"/>
                        <View style={listStyle.list}>
                            {mitProjects.map((project, index) =>
                                <ListItem
                                    bottomDivider
                                    rightIcon={{name: 'open-in-new', color: colors.secondary2}}
                                    key={`index-${project.name}`}
                                    title={project.name}
                                    onPress={() => {
                                        Utils.goToURL(project.link);
                                    }}
                                />,
                            )}
                        </View>
                    </View> : null}

                {bsdProjects.length > 0 ?
                    <View>
                        <Label text="BSD"/>
                        <View style={listStyle.list}>
                            {bsdProjects.map(project =>
                                <ListItem
                                    bottomDivider
                                    rightIcon={{name: 'open-in-new', color: colors.secondary2}}
                                    key={`index-${project.name}`}
                                    title={project.name}
                                    onPress={() => {
                                        Utils.goToURL(project.link);
                                    }}
                                />,
                            )}
                        </View>
                    </View> : null}

            </View>
        );
    }
}

