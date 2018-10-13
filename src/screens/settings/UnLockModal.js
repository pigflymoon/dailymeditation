import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    ImageBackground,
    Alert,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
    Icon,
    Button
} from 'react-native-elements';
import SliderEntry from '../../components/SliderEntry';

import {
    onPay,
    onRestore,
    upDateRole
} from '../../utils/AppPay';
import {sliderWidth, itemWidth} from '../../styles/sliderEntry';
import unlockModalStyle from '../../styles/unlockModal';
import colors from '../../styles/colors';
import BG_IMAGE from '../../assets/images/gradient-bg1.jpg';
import bg1 from '../../assets/images/unlock1.jpg';
import bg2 from '../../assets/images/unlock2.jpg';
import bg3 from '../../assets/images/unlock3.jpg';

import authStyle from '../../styles/auth';


import layoutStyle from '../../styles/layout';
const SLIDER_1_FIRST_ITEM = 0;

export const ENTRIES1 = [
    {
        title: 'Get all types of meditation with new meditation always on the way',
        illustration: "https://firebasestorage.googleapis.com/v0/b/daily-meditation-805c9.appspot.com/o/appImages%2Funlock1.jpg?alt=media&token=11549c3f-8f52-4cc5-8bc5-7b30db315751"
    },
    {
        title: 'Basic meditation for both beginner and advanced users.',
        illustration: 'https://firebasestorage.googleapis.com/v0/b/daily-meditation-805c9.appspot.com/o/appImages%2Funlock2.jpg?alt=media&token=f6cf54bb-5ffb-40ad-b6ef-23df0cc24aeb'
    },
    {
        title: 'Guided meditation to help you calm, relax or sleep.',
        illustration: 'https://firebasestorage.googleapis.com/v0/b/daily-meditation-805c9.appspot.com/o/appImages%2Funlock3.jpg?alt=media&token=bd59b94e-3c5f-420a-9c58-4c25d88c5cbc'
    },

];
export  default class UnLockModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            isLoading: false,
            unlock: false,
        };
    }

    _renderItemWithParallax({item, index}, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
                resizeStyle={true}
            />
        );
    }

    unlockProVersion = () => {
        var self = this;
        onPay().then(function (statusResult) {
            var status = statusResult.status, statusCode = statusResult.statusCode;
            if (statusCode) {
                for (var prop in statusCode) {
                    if (status == prop) {
                        if (status == 0) {
                            self.setState({unlock: true})

                        } else {
                            Alert.alert('Message: ' + statusCode[prop].message);
                        }
                    }
                }
            } else {
                Alert.alert('Please try later');

            }
        })


        //
    }

    goBack = () => {
        const {navigation} = this.props;
        navigation.goBack();
        navigation.state.params.onUnlock({unLock: this.state.unlock});
    }

    restorePurchase = () => {
        var self = this;
        onRestore().then(function (restoreResponse) {
            if (restoreResponse.restore) {
                self.setState({unlock: true});
                //update db user
                upDateRole();
                Alert.alert('Restore Successful', 'Successfully restores all your purchases.');

            }
        })

    }

    renderSlide = () => {
        const {slider1ActiveSlide} = this.state;

        return (
            <View style={unlockModalStyle.exampleContainer}>
                <Text style={unlockModalStyle.title}>{`PRO Version`}</Text>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={ENTRIES1}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={unlockModalStyle.slider}
                    contentContainerCustomStyle={unlockModalStyle.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({slider1ActiveSlide: index}) }
                />
                <Pagination
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={unlockModalStyle.paginationContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={unlockModalStyle.paginationDot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View>
        )
    }

    render() {
        const {
            isLoading,
        } = this.state;
        return (
            <ImageBackground
                source={BG_IMAGE}
                style={layoutStyle.bgImage}
            >

                <ScrollView style={{flex: 1,}}
                            scrollEventThrottle={200}
                            directionalLockEnabled={true}
                >
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: 20,
                        marginTop: 30,
                    }}>
                        <Icon
                            name='close'
                            color={colors.white}
                            size={28}
                            onPress={this.goBack}
                        />

                    </View>

                    {this.renderSlide()}

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                        <Button
                            title={'Unlock PRO ($2.99)'}
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPress={ this.unlockProVersion}
                            loading={isLoading}
                            disabled={isLoading}
                            loadingProps={{size: 'small', color: 'white'}}
                            buttonStyle={authStyle.button}
                            containerStyle={{marginVertical: 5}}
                            titleStyle={{color: 'white'}}
                        />
                        <Button
                            title={'Restore Purchase'}
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPress={ this.restorePurchase}
                            loading={isLoading}
                            disabled={isLoading}
                            loadingProps={{size: 'small', color: 'white'}}
                            buttonStyle={authStyle.button}
                            containerStyle={{marginVertical: 5}}
                            titleStyle={{color: 'white'}}
                        />

                    </View>
                </ScrollView>
            </ImageBackground>



        );
    }
}
