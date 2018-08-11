import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight} from 'react-native';
import GridView from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';

import imageStyle from '../styles/image'

import {
    getAudiosByCategoryAndType,
} from '../utils/FetchAudiosByApi';

export default class GridCardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audiosData: []
        }
    }

    openAudioModal = (item) => {
        console.log('item is ', item);
        // console.log('this.prop',this.props)
        this.props.navigation.navigate("MusicPlayer");

    }

    fetchData = (category, type, isPaidUser) => {
        var self = this;
        return new Promise(function (resolve, reject) {
            // some async operation here
            setTimeout(function () {
                // resolve the promise with some value
                if (!isPaidUser) {
                    getAudiosByCategoryAndType(category, type, 3).then(function (audios) {
                        resolve(audios)
                    });

                } else {
                    getAudiosByCategoryAndType(category, type, 3).then(function (audios) {
                        resolve(audios)
                    });
                }


            }, 500);
        });
    }

    componentWillMount() {
        var self = this;
        console.log('fetch data???')
        const {category, type, isPaidUser} = this.props;
        console.log('category is ', category);
        this.fetchData(category, type, isPaidUser).then(function (audios) {
            console.log('fetch data', audios)
            self.setState({
                audiosData: audios
            });
        });


    }

    render() {
        return (
            <GridView
                itemDimension={130}
                items={this.state.audiosData}
                style={imageStyle.gridView}
                renderItem={item => (
                    <TouchableHighlight
                        onPress={(item) => this.openAudioModal()}
                    >
                        <ImageBackground style={imageStyle.imageContainer}
                                         imageStyle={imageStyle.imageRadiusBorder}
                                         source={{uri: item.imageDownloadUrl}}>
                            <LinearGradient colors={['transparent', 'black']} start={{x: 0.5, y: 0.4}}
                                            style={imageStyle.imageGradient}>
                                <View style={imageStyle.text}>
                                    <Text style={imageStyle.title}>{item.audioType}</Text>
                                    <Text style={imageStyle.subtitle}>{item.name}</Text>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableHighlight>


                )}
            />
        );
    }
}
