import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions} from 'react-native';
import {
    Input, Button, Card,
} from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';

import {auth} from '../../config/FirebaseConfig';
import  Utils from '../../utils/utils';

import colorStyle from '../../styles/colors';
import authStyle from '../../styles/auth';
import BG_IMAGE from '../../assets/images/authBg.jpg';

export default class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSignBox: true,
            welcomeCard: false,
            email: '',
            email_valid: true,
            password: '',
            password_valid: true,
            login_failed: false,
            showLoading: false,
            errorMessage: false,
            validateEmailInfo: 'Please enter a valid email address',
            validatePasswordInfo: 'Please enter a valid password',
            validateNameMessage: 'Please enter a valid name',
        };
    }

    async componentDidMount() {
        var self = this;
        auth.onAuthStateChanged(function (user) {
            if (user) {
                var displayName = user.displayName ? user.displayName : (user.email).split("@")[0];
                var title = `Hi ${displayName}, welcome to daily meditation:simple habit`

                self.setState({
                    user: user,
                    signin: true,
                    welcomeCard: true,
                    showSignBox: false,
                    title: title,
                    //
                })

            }
        })
    }


    handleSignin = (e) => {
        var self = this;
        e.preventDefault();
        const {
            email,
            password,
        } = this.state;

        this.setState({showLoading: true});

        setTimeout(() => {
            auth.signInWithEmailAndPassword(email, password)
                .then(function () {
                    auth.onAuthStateChanged(function (user) {
                        if (user) {
                            if (self.props.navigation.state.params) {
                                const {previousScreen, audio} = self.props.navigation.state.params;
                                if (previousScreen) {
                                    var displayName = user.displayName ? user.displayName : (user.email).split("@")[0];
                                    var title = `Hi ${displayName}, Welcome to DailyMeditation:Simple Habit!`
                                    self.setState({
                                        showLoading: false,
                                        user: user,
                                        signin: true,
                                        welcomeCard: true,
                                        showSignBox: false,
                                        title: title,
                                    }, () => {
                                        self.props.navigation.navigate(previousScreen, {audio: audio});//audioArray
                                    })

                                } else {
                                    var displayName = user.displayName ? user.displayName : (user.email).split("@")[0];
                                    var title = `Hi ${displayName}, Welcome to DailyMeditation:Simple Habit!`
                                    self.setState({
                                        showLoading: false,
                                        user: user,
                                        signin: true,
                                        welcomeCard: true,
                                        showSignBox: false,
                                        title: title,
                                    })
                                }

                            } else {
                                var displayName = user.displayName ? user.displayName : (user.email).split("@")[0];
                                var title = `Hi ${displayName}, Welcome to DailyMeditation:Simple Habit!`
                                self.setState({
                                    showLoading: false,
                                    user: user,
                                    signin: true,
                                    welcomeCard: true,
                                    showSignBox: false,
                                    title: title,
                                })
                            }

                        } else {
                            self.setState({showLoading: false});
                        }
                    })
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    switch (errorCode) {
                        case 'auth/invalid-email':
                        case 'auth/user-disabled':
                        case 'auth/operation-not-allowed':
                        case 'auth/user-not-found':
                        case 'auth/wrong-password':
                            self.setState({
                                errorMessage: errorMessage,
                                showLoading: false
                            });
                            break;
                        default:
                            self.setState({
                                errorMessage: 'Error',
                                showLoading: false,
                            });
                    }
                });
            //

        }, 1500);


    }

    handleSignout = () => {
        var self = this;
        this.setState({showLoading: true});
        // Simulate an API call
        setTimeout(() => {
            // LayoutAnimation.easeInEaseOut();
            auth.signOut().then(function () {
                // Sign-out successful.
                self.setState({
                    showLoading: false,
                    showSignBox: true,
                    welcomeCard: false,
                })
            }).catch(function (error) {
                // An error happened.
                var errorMessage = error.message;
                self.setState({
                    errorMessage: errorMessage,
                });
            });

        }, 1500);

    }

    navigateToResetPassword = () => {
        this.props.navigation.navigate('ResetPassword', {});
    }
    navigateToSignup = () => {
        this.props.navigation.navigate('Signup', {});
    }
    setEmail = (text) => {
        this.setState({errorMessage: '', email: text});
    }

    setPassword = (text) => {
        this.setState({errorMessage: '', password: text});
    }
    renderSignBox = () => {
        const {email, password, email_valid, password_valid, showLoading} = this.state;

        return (
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
                            this.passwordInput.focus();
                        }}
                        blurOnSubmit={false}
                        placeholderTextColor={colorStyle.grey5}
                        errorStyle={{textAlign: 'center', fontSize: 12}}
                        errorMessage={email_valid ? null : "Please enter a valid email address"}
                    />
                    <Input
                        leftIcon={
                            <Icon
                                name='lock'
                                color='rgba(171, 189, 219, 1)'
                                size={25}
                            />
                        }
                        containerStyle={{marginVertical: 5}}
                        onChangeText={(password) => this.setPassword(password)}
                        onSubmitEditing={() => {
                            this.setState({password_valid: Utils.validPassword(password)});
                            this.passwordInput.focus();
                        }}
                        selectionColor={colorStyle.white}
                        value={password}
                        inputStyle={{marginLeft: 10, color: 'white'}}
                        secureTextEntry={true}
                        keyboardAppearance="light"
                        placeholder="Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="done"
                        ref={ input => this.passwordInput = input}
                        blurOnSubmit={true}
                        placeholderTextColor={colorStyle.grey5}
                        errorStyle={{textAlign: 'center', fontSize: 12}}
                        errorMessage={password_valid ? null : "Please enter a valid password"}
                    />
                </View>
                <Button
                    title='LOG IN'
                    activeOpacity={1}
                    underlayColor="transparent"
                    onPress={this.handleSignin}
                    loading={showLoading}
                    loadingProps={{size: 'small', color: 'white'}}
                    disabled={ !email_valid && password.length < 6}
                    buttonStyle={authStyle.button}
                    containerStyle={{marginVertical: 5}}
                    titleStyle={{color: 'white'}}
                />
                <View style={authStyle.footerView}>
                    <Text style={{color: colorStyle.white}}>
                        New here?
                    </Text>
                    <Button
                        title="Create an Account"
                        clear
                        activeOpacity={0.5}
                        titleStyle={{color: 'white', fontSize: 15}}
                        containerStyle={{marginTop: -10}}
                        onPress={this.navigateToSignup}
                    />

                    <Button
                        title="Forgot password?"
                        clear
                        activeOpacity={0.5}
                        titleStyle={{color: 'white', fontSize: 15}}
                        containerStyle={{marginTop: -10}}
                        onPress={this.navigateToResetPassword}
                    />
                </View>
            </View>
        )
    }

    renderWelcomeBox = () => {
        const {
            showLoading,
        } = this.state;
        return (
            <Card
                containerStyle={[authStyle.formContainer]}
                titleStyle={authStyle.cardTitle}
                title={this.state.title}
            >
                <Button
                    title="SIGN OUT"
                    activeOpacity={1}
                    underlayColor="transparent"
                    onPress={this.handleSignout}
                    loading={showLoading}
                    loadingProps={{size: 'small', color: 'white'}}
                    buttonStyle={authStyle.button}
                    containerStyle={{marginVertical: 5}}
                    titleStyle={{color: 'white'}}
                />
            </Card>
        )
    }

    render() {
        const {isConnected} = this.props.screenProps;
        if (!isConnected) {
            return Utils.renderOffline();
        }
        return (
            <View style={authStyle.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={authStyle.bgImage}
                >
                    {this.state.showSignBox && this.renderSignBox()}
                    {this.state.welcomeCard && this.renderWelcomeBox()}

                </ImageBackground>
            </View>
        );
    }
}

