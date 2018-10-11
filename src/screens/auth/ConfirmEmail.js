import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions} from 'react-native';
import {Input, Button} from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';

import {auth} from '../../config/FirebaseConfig';
import {doCreateUser} from '../../config/db';

import  Utils from '../../utils/utils';

import colorStyle from '../../styles/colors';
import authStyle from '../../styles/auth';
import BG_IMAGE from '../../assets/images/authBg.jpg';
let interval = null;


export default class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            showLoading: false,
            errorMessage: false,

        };
    }

    async componentDidMount() {

    }

    handleConfirmEmail = (e) => {
        var self = this;
        var user = this.state.user;
        this.setState({isLoading: true});

        e.preventDefault();

        user.sendEmailVerification().then(
            function () {
                interval = setInterval(() => {
                    user.reload().then(
                        function () {
                            if (interval && user.emailVerified) {
                                clearInterval(interval);
                                interval = null;

                                auth.onAuthStateChanged((user) => {
                                    self.setState({
                                        isLoading: false
                                    });
                                    clearInterval(interval);
                                    if (user && user.emailVerified) {
                                        self.props.navigation.navigate('Signin', {name: self.state.name});
                                        clearInterval(interval);
                                        interval = null;
                                    } else {
                                        self.setState({
                                            isLoading: false
                                        });
                                    }
                                });

                            } else {
                                self.setState({
                                    isLoading: false,
                                    errorMessage: 'Error',
                                });
                            }
                        }).catch(function (error) {
                        self.setState({
                            isLoading: false,
                            errorMessage: 'Error',
                        });
                        // var errorMessage = error.message + ' (' + error.code + ')';
                        // self.setState({showErrorInfo: true, errorInfo: errorMessage});
                    });
                }, 1000 * 30);
            }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            self.setState({
                errorMessage: errorMessage,
                isLoading: false,
            });
        });


    }


    render() {
        const {
            showLoading,
        } = this.state;
        const {email} = this.props.navigation.state.params;
        return (
            <View style={authStyle.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={authStyle.bgImage}
                >
                    <View style={authStyle.loginView}>
                        <View style={authStyle.loginTitle}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={authStyle.travelText}>MY PEACEFUL</Text>
                                <Text style={authStyle.plusText}>+</Text>
                            </View>
                            <View style={{marginTop: -10}}>
                                <Text style={authStyle.travelText}>PLACE</Text>
                            </View>
                        </View>
                        <View style={authStyle.loginInput}>
                            <Input
                                leftIcon={
                  <Icon
                    name='envelope-o'
                    color='rgba(171, 189, 219, 1)'
                    size={25}
                  />
                }
                                containerStyle={{marginVertical: 5}}
                                value={email}
                                inputStyle={{marginLeft: 10, color: 'white'}}
                                keyboardAppearance="light"
                                placeholder="Email"
                                autoFocus={false}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                ref={ input => this.emailInput = input }
                                blurOnSubmit={false}
                                placeholderTextColor="white"
                            />

                        </View>
                        <Button
                            title='CONFIRM'
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPress={this.handleConfirmEmail}
                            loading={showLoading}
                            loadingProps={{size: 'small', color: 'white'}}
                            buttonStyle={authStyle.button}
                            containerStyle={{marginVertical: 10}}
                            titleStyle={{color: 'white'}}
                        />
                        <View style={authStyle.footerView}>
                            <Text style={{color: colorStyle.white}}>
                                New here?
                            </Text>
                            <Button
                                title="Have an Account"
                                clear
                                activeOpacity={0.5}
                                titleStyle={{color: 'white', fontSize: 15}}
                                containerStyle={{marginTop: -10}}
                                onPress={this.navigateToSignin}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

