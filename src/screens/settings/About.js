import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, ScrollView,Dimensions} from 'react-native';
import {Card,} from 'react-native-elements';

import Copyright from '../../components/Copyright';
import ImageSourceCopyright from '../../components/ImageSourceCopyright';

import authStyle from '../../styles/auth';
import BG_IMAGE from '../../assets/images/authBg.jpg';

import probg from '../../assets/images/probg.jpg';


export default class About extends Component {

    render() {

        return (
            <View style={authStyle.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={authStyle.bgImage}
                >
                    <ScrollView style={authStyle.container}>
                        <Card
                            title='FEATURES'
                            image={probg}>
                            <Text style={{marginBottom: 10}}>
                                1. Easy to learn meditation.
                            </Text>
                            <Text style={{marginBottom: 10}}>
                                2. Updated variety meditations, you will have surprise!
                            </Text>
                            <Text style={{marginBottom: 10}}>
                                3. Basic meditation for both beginner and advanced users.
                            </Text>
                            <Text style={{marginBottom: 10}}>
                                4. Breathing exercises to help you relax.
                            </Text>
                            <Text style={{marginBottom: 10}}>
                                5. Guided meditation to help you calm, relax or sleep.
                            </Text>

                        </Card>
                        <Card
                            title='ACKNOWLEDGEMENTS'>
                            <Text style={{marginBottom: 10}}>
                                1.I want to thank Matt Luedke for his nice music. Free Music For App Store Preview Videos.
                                http://www.mattluedke.com/free-music-app-store-preview-videos/
                            </Text>
                            <Text style={{marginBottom: 10}}>
                                2.Thanks for Pexels sharing beautiful Photos.Photo is licensed under CC0 from website.
                            </Text>
                        </Card>
                        <Copyright/>
                        <ImageSourceCopyright/>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

