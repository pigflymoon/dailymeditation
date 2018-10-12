import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Label from './Label';
import Utils from '../utils/utils';
import colors from '../styles/colors';

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
                name: 'rn-placeholder',
                link: 'https://github.com/mfrachet/rn-placeholder'
            },
            {
                name: 'react-native-mask-loader',
                link: 'https://github.com/TheSavior/react-native-mask-loader'
            },
            {
                name: 'react-native-image-marker',
                link: 'https://github.com/JimmyDaddy/react-native-image-marker'
            },
            {
                name: 'react-native-color-wheel',
                link: 'https://github.com/netbeast/react-native-color-wheel'
            },
            {
                name: 'react-native-snap-carousel',
                link: 'https://github.com/archriss/react-native-snap-carousel'
            },
            {
                name: 'react-native-flip-component',
                link: 'https://github.com/plmok61/react-native-flip-component'
            },
            {
                name: 'react-native-color',
                link: 'https://github.com/hectahertz/react-native-color'
            },
            {
                name: 'react-native-version-check',
                link: 'https://github.com/kimxogus/react-native-version-check'
            }


        ];

        return (
            <View>
                {mitProjects.length > 0 ?
                    <View>
                        <Label text="MIT"/>
                        <List containerStyle={{borderTopWidth: 0}}>
                            {mitProjects.map((project, index) =>
                                <ListItem
                                    rightIcon={{name: 'open-in-new', color: colors.secondary2}}
                                    key={`index-${project.name}`}
                                    title={project.name}
                                    onPress={() => {
                                        Utils.goToURL(project.link);
                                    }}
                                />,
                            )}
                        </List>
                    </View> : null}

                {bsdProjects.length > 0 ?
                    <View>
                        <Label text="BSD"/>
                        <List containerStyle={{borderTopWidth: 0}}>
                            {bsdProjects.map(project =>
                                <ListItem
                                    rightIcon={{name: 'open-in-new', color: colors.secondary2}}
                                    key={`index-${project.name}`}
                                    title={project.name}
                                    onPress={() => {
                                        Utils.goToURL(project.link);
                                    }}
                                />,
                            )}
                        </List>
                    </View> : null}

            </View>
        );
    }
}

