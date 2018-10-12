import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, ScrollView,Dimensions} from 'react-native';
import {Card,} from 'react-native-elements';

import Copyright from '../../components/Copyright';

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
                                1. Multiple card template
                                * Updated variety cards, you will have surprise!
                            </Text>
                            <Text style={{marginBottom: 10}}>
                                2. Easy to edit for instant creation
                                * you will find your festival favourite
                            </Text>
                            <Text style={{marginBottom: 10}}>
                                3. Unique artwork straight by designer
                                * All templates have been produced with love by designer
                            </Text>
                            <Text style={{marginBottom: 10}}>
                                4. Email and share
                                * Easy to use and make our world more green

                            </Text>

                        </Card>
                        <Card
                            title='ACKNOWLEDGEMENTS'>
                            <Text style={{marginBottom: 10}}>
                                1.I want to thank Matt Luedke for his nice music. Free Music For App Store Preview Videos.
                                http://www.mattluedke.com/free-music-app-store-preview-videos/
                            </Text>
                        </Card>
                        <Copyright/>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

