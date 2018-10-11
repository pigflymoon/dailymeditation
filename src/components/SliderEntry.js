import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../styles/sliderEntry';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object,
        resizeStyle: PropTypes.bool,
    };

    get image() {
        const {data: {illustration}, parallax, parallaxProps, even, resizeStyle} = this.props;


        return parallax ? (
                <ParallaxImage
                    source={{uri: illustration}}
                    containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                    style={[styles.image, resizeStyle ? styles.resizeModeContain : {}]}
                    parallaxFactor={0.35}
                    showSpinner={true}
                    spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                    {...parallaxProps}
                />
            ) : (
                <Image
                    source={{uri: illustration}}
                    style={styles.image}
                />
            );
    }

    render() {
        const {data: {title, subtitle}, even} = this.props;

        const uppercaseTitle = title ? (
                <Text
                    style={[styles.title]}
                    numberOfLines={2}
                >
                    { title.toUpperCase() }
                </Text>
            ) : false;
        const slideTitle = title ? (
                <Text
                    style={[styles.title]}
                    numberOfLines={2}
                >
                    { title }
                </Text>
            ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
            >
                <View style={styles.shadow}/>
                <View style={[styles.imageContainer]}>
                    { this.image }
                    <View style={[styles.radiusMask]}/>
                </View>
                <View style={[styles.textContainer,]}>
                    { slideTitle }
                    <Text
                        style={[styles.subtitle]}
                        numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
