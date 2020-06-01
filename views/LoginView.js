import React, { Component } from 'react';
import { View, Button, Linking } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import FacebookClient from '../services/FacebookClient';
import BackendClient from '../services/BackendClient';
import Style from '../Style';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = UPPER.toLowerCase();
const NUM = '0123456789';
const ALPHANUM = UPPER + LOWER + NUM;

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this.loginState = null;

        this.onLoginPressed = this.onLoginPressed.bind(this);
        this.onConfirmPressed = this.onConfirmPressed.bind(this);
    }

    render() {
        return (
            <View style={Style.container}>
                <Button style={Style.input} title='Zaloguj' onPress={this.onLoginPressed} />
                <Button style={Style.input} title='Potwierdź' onPress={this.onConfirmPressed} />
                <ProgressBar indeterminate={true} visible={this.state.loading} />
            </View>
        );
    }

    updateStateProperty(property, value) {
        let newState = this.state;
        newState[property] = value;
        this.setState(newState);
    }

    onLoginPressed() {
        this.loginState = generateRandomString(30);
        let url = FacebookClient.getLoginUrl(this.loginState);
        Linking.openURL(url);
    }

    async onConfirmPressed() {
        this.updateStateProperty('loading', true);
        let accounts = [];
        let code = await BackendClient.getFacebookCode(this.loginState);
        let accessToken = await FacebookClient.getAccessToken(code);
        let pageIDs = await FacebookClient.getUserPagesIDs(accessToken);
        for (let pageID of pageIDs) {
            let accountID = await FacebookClient.getInstagramAccountID(pageID, accessToken);
            if (accountID != null) {
                let account = await FacebookClient.getInstagramAccountInfo(accountID, accessToken);
                accounts.push(account);
            }
        }
        this.updateStateProperty('loading', false);
        this.props.navigation.navigate('Accounts', { accounts: accounts });
    }
}

function generateRandomString(length) {
    let s = '';
    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * ALPHANUM.length);
        s += ALPHANUM.charAt(index);
    }
    return s;
}

export default LoginView;