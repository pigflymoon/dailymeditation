import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions} from 'react-native';
import {Input, Button} from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';

import {auth} from '../../config/FirebaseConfig';

import  Utils from '../../utils/utils';

import colorStyle from '../../styles/colors';
import authStyle from '../../styles/auth';
import BG_IMAGE from '../../assets/images/authBg.jpg';


export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            email_valid:true,
            showLoading: false,
            errorMessage: false,

        };
    }

    navigateToSignin = () => {
        this.props.navigation.navigate('Signin', {});
    }

    setEmail = (text) => {
        this.setState({errorMessage: '', email: text});
    }

    handleResetPassword = () => {
        var self = this;
        if (!this.state.email) {
            this.setState({
                errorMessage: 'Please enter a valid email address'
            });
        } else {
            var emailAddress = this.state.email;
            this.setState({showLoading: true});
            auth.sendPasswordResetEmail(emailAddress).then(function () {
                // Email sent.
                self.setState({
                    showLoading: false,
                }, () => {
                    Utils.infoAlert(`Email Sent`, `Reset password sent to the email Address,\n please check your email: ${emailAddress}`);
                    self.props.navigation.navigate('Signin');
                });

            }, function (error) {
                self.setState({
                    errorMessage: 'Error: ' + error,
                    showLoading: false,
                });

            })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    self.setState({
                        errorMessage: errorMessage,
                        showLoading: false,
                    });
                });
            ;
        }
    }



    render() {
        const {
            showLoading,
            email_valid
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
                                <Text style={authStyle.titleText}>MY PEACEFUL</Text>
                                <Text style={authStyle.plusText}>+</Text>
                            </View>
                            <View style={{marginTop: -10}}>
                                <Text style={authStyle.titleText}>PLACE</Text>
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
                                selectionColor={colorStyle.white}
                                containerStyle={{marginVertical: 5}}
                                onChangeText={(email) => this.setEmail(email)}
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
                                onSubmitEditing={() => {
                  this.setState({email_valid: Utils.validateEmail(email)});
                }}
                                blurOnSubmit={false}
                                placeholderTextColor={colorStyle.grey5}
                                errorStyle={{textAlign: 'center', fontSize: 12}}
                                errorMessage={email_valid ? null : "Please enter a valid email address"}
                            />

                        </View>
                        <Button
                            title='CONFIRM'
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPress={this.handleResetPassword}
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

