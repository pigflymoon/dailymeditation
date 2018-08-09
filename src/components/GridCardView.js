import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight} from 'react-native';
import GridView from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';
import img5 from '../assets/images/5.jpg';
import img6 from '../assets/images/6.jpg';
import imageStyle from '../styles/image'
const images = [
    {image: img1, name: 'TURQUOISE', code: '#1abc9c'},
    {image: img2, name: 'PETER RIVER', code: '#3498db'},
    {image: img3, name: 'WET ASPHALT', code: '#34495e'},
    {image: img4, name: 'PUMPKIN', code: '#d35400'},
    {image: img5, name: 'ALIZARIN', code: '#e74c3c'},
    {image: img6, name: 'NEPHRITIS', code: '#27ae60'}
];
import {
    getAllAudiosByType,

} from '../utils/FetchAudiosByApi';

export default class GridCardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesData: []
        }
    }

    openAudioModal = (item) => {
        console.log('item is ', item);
        // console.log('this.prop',this.props)
        this.props.navigation.navigate("MusicPlayer");

    }

    fetchData = (imageType, isPaidUser) => {
        var self = this;
        return new Promise(function (resolve, reject) {
            // some async operation here
            setTimeout(function () {
                // resolve the promise with some value
                if (!isPaidUser) {
                    getAllAudiosByType(imageType, 3).then(function (images) {
                        resolve(images)
                    });

                } else {
                    getAllAudiosByType(imageType).then(function (images) {
                        resolve(images)

                    });
                }


            }, 500);
        });
    }

    componentWillMount() {
        var self = this;
        console.log('fetch data???')
        const {imageType, isPaidUser, category} = this.props;

        this.fetchData(imageType, isPaidUser).then(function (audios) {
            console.log('fetch data', audios)
            self.setState({
                imagesData: audios
            });
        });


    }

    render() {
        console.log('Gridview??')
        return (
            <GridView
                itemDimension={130}
                items={this.state.imagesData}
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
