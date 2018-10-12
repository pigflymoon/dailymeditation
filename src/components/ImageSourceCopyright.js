import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import Label from './Label';
import Utils from '../utils/utils';
import colors from '../styles/colors';
import listStyle from '../styles/list';

export default class ImageSourceCopyright extends Component {

    render() {

        const picResources = [
            {
                name: 'Tamba Budiarsana',
                link: 'https://www.pexels.com/photo/stretching-white-cat-979247/',
            },
            {
                name: 'Kaniz Sheikh',
                link: 'https://www.pexels.com/photo/photo-of-ocean-758733/',
            },
            {
                name: 'Ibrahim Asad',
                link: 'https://www.pexels.com/photo/beach-calm-clouds-idyllic-457882/',
            },
            {
                name: 'Pixabay',
                linke: 'https://www.pexels.com/photo/beach-birds-calm-clouds-219998/'
            }
        ];

        return (
            <View>
                {picResources.length > 0 ?
                    <View>
                        <Label text="Pexels are licensed under the Creative Commons Zero (CC0)"/>
                        <View style={listStyle.list}>
                            {picResources.map((project, index) =>
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

