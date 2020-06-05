import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

import FacebookClient from '../services/FacebookClient';
import BackendClient from '../services/BackendClient';

import Style, { BIG_ICON_SIZE, YELLOW } from '../utils/Style';
import StateManager from '../utils/StateManager';

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
            <View style={Style.loginContainer}>
                <View style={Style.loginSubContainer}>
                    <TouchableOpacity onPress={this.onLoginPressed} style={Style.loginButtonContainer}>
                        <View style={Style.horizontalContainer}>
                            <Text style={Style.largeWhiteLabel}>ZALOGUJ SIĘ</Text>
                            <Entypo name='facebook' size={BIG_ICON_SIZE} style={Style.whiteIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onConfirmPressed} style={Style.loginButtonContainer}>
                        <View style={Style.horizontalContainer}>
                            <Text style={Style.largeWhiteLabel}>POTWIERDŹ</Text>
                            <Entypo name='check' size={BIG_ICON_SIZE} style={Style.whiteIcon} />
                        </View>
                    </TouchableOpacity>
                </View>               
                <ProgressBar indeterminate={true} visible={this.state.loading} color={YELLOW} /> 
            </View>
        );
    }

    onLoginPressed() {
        this.loginState = generateRandomString(30);
        let url = FacebookClient.getLoginUrl(this.loginState);
        Linking.openURL(url);
    }

    async onConfirmPressed() {
        StateManager.updateStateProperty(this, 'loading', true);
        let accounts = [];
        let code = await BackendClient.getFacebookCode(this.loginState);
        let accessToken = await FacebookClient.getAccessToken(code);
        let pageIDs = await FacebookClient.getUserPagesIDs(accessToken);
        for (let pageID of pageIDs) {
            let accountID = await FacebookClient.getInstagramAccountID(pageID, accessToken);
            if (accountID != null) {
                let account = await FacebookClient.getInstagramAccountInfo(accountID, accessToken);
                account.accessToken = accessToken;
                accounts.push(account);
            }
        }
        StateManager.updateStateProperty(this, 'loading', false);
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