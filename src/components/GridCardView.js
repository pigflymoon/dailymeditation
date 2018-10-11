import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight} from 'react-native';
import GridView from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';

import imageStyle from '../styles/image'

import {
    getAudiosByCategoryAndType,
} from '../utils/FetchAudiosByApi';

export default class GridCardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audiosData: [],
            category: this.props.category,
            isLoading: true,
            color: "#FFFFFF",
            size: 100,
        }
    }

    openAudioModal = (e, audioData, item) => {
        // console.log('audioData is ', JSON.stringify(audioData));
        console.log('audioData is ', (audioData));

        this.props.navigation.push("PlayList", {audio: audioData});//audioArray

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
        const {category, type, isPaidUser} = this.props;

        this.fetchData(category, type, isPaidUser).then(function (audios) {
            self.setState({
                audiosData: audios,
                isLoading: false
            });
        });


    }

    renderBeginner = () => {
        return (
            <View>
                {this.state.isLoading ?
                    <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}><Spinner
                        style={{ marginBottom: 50}}
                        isVisible={this.state.isLoading}
                        size={this.state.size}
                        type="ThreeBounce"
                        color={this.state.color}/>
                    </View> : <View>
                        {Object.keys(this.state.audiosData).map(key => {
                            const items = (this.state.audiosData)[key];
                            console.log('items are **********', items)
                            return (
                                <GridView
                                    key={key}
                                    itemDimension={130}
                                    items={items}
                                    style={imageStyle.gridView}
                                    renderItem={item => (
                                <TouchableHighlight
                                    onPress={(e) => this.openAudioModal(e, items, item)}
                                >
                                    <ImageBackground style={imageStyle.imageContainer}
                                                     imageStyle={imageStyle.imageRadiusBorder}
                                                     source={{uri: item.imageDownloadUrl}}>
                                        <LinearGradient colors={['transparent', 'black']}
                                                        start={{x: 0.5, y: 0.4}}
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
                            )

                        })}
                    </View>
                }
            </View>
        )
    }

    renderCategory = () => {
        return (
            <View>
                {this.state.isLoading ?
                    <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}><Spinner
                        style={{ marginBottom: 50}}
                        isVisible={this.state.isLoading}
                        size={this.state.size}
                        type="ThreeBounce"
                        color={this.state.color}/>
                    </View> : <View>
                        <GridView
                            itemDimension={130}
                            items={this.state.audiosData}
                            style={imageStyle.gridView}
                            renderItem={item => (
                                <TouchableHighlight
                                    onPress={(e) => this.openAudioModal(e, this.state.audiosData, item)}
                                >
                                    <ImageBackground style={imageStyle.imageContainer}
                                                     imageStyle={imageStyle.imageRadiusBorder}
                                                     source={{uri: item.imageDownloadUrl}}>
                                        <LinearGradient colors={['transparent', 'black']}
                                                        start={{x: 0.5, y: 0.4}}
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
                    </View>
                }
            </View>
        )
    }

    render() {
        const {category} = this.props;
        return (
            <View>
                {
                    (category == 'beginner' ? this.renderBeginner() : this.renderCategory())
                }

            </View>
        )

    }
}
