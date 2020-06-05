import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Database from '../utils/Database';
import Style, { GRADIENT_COLORS, ICON_SIZE } from '../utils/Style';
import StateManager from '../utils/StateManager';

class AccountsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

        this.onResume = this.onResume.bind(this);
        this.onAddAccountsPressed = this.onAddAccountsPressed.bind(this);
        this.onAccountItemPressed = this.onAccountItemPressed.bind(this);
        this.onAccountItemRemoved = this.onAccountItemRemoved.bind(this);
    }

    render() {
        return (
            <LinearGradient colors={GRADIENT_COLORS} style={Style.container}>
                <TouchableOpacity onPress={this.onAddAccountsPressed} style={Style.buttonContainer}>
                    <View style={Style.horizontalContainer}>
                        <Text style={Style.bigWhiteLabel}>DODAJ KONTO</Text>
                        <FontAwesome name='plus' size={ICON_SIZE} style={Style.whiteIcon} />
                    </View>
                </TouchableOpacity>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (<AccountItem accountItem={item} onItemPressed={this.onAccountItemPressed} onItemRemoved={this.onAccountItemRemoved} />)}
                    keyExtractor={item => item.id} />
            </LinearGradient>
        );
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', this.onResume);
        this.loadAllAccounts();
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.onResume);
    }

    onResume() {
        if (this.props.route.params && this.props.route.params.accounts)
            this.loadNewAccounts();
    }

    async loadAllAccounts() {
        let newData = this.state.data;
        let db = Database.getInstance();
        await db.initialize();
        newData = await db.loadAccounts();
        StateManager.updateStateProperty(this, 'data', newData);
    }

    onAddAccountsPressed() {
        this.props.navigation.navigate('Login');
    }

    async loadNewAccounts() {
        let newAccounts = this.props.route.params.accounts;
        let db = Database.getInstance();
        for (let newAccount of newAccounts)
            await db.insertAccount(newAccount);
        
        await this.loadAllAccounts();
        this.props.route.params.accounts = null;
    }

    onAccountItemPressed(accountItem) {
        this.props.navigation.navigate('Posts', { account: accountItem });
    }

    async onAccountItemRemoved(accountItem) {
        let newData = this.state.data;
        let index = newData.indexOf(accountItem);
        let db = Database.getInstance();
        newData.splice(index, 1);
        await db.removeAccount(accountItem);
        StateManager.updateStateProperty(this, 'data', newData);
    }
}

function AccountItem({accountItem, onItemPressed, onItemRemoved}) {
    return (
        <TouchableOpacity onPress={() => onItemPressed(accountItem)}>
            <View style={Style.elementContainer}>
                <View style={Style.horizontalContainer}>
                    { accountItem.pictureUrl && (
                        <Image style={{height: 75, aspectRatio: 1}} resizeMode='contain' source={{uri: accountItem.pictureUrl}} />)
                    }
                    { !accountItem.pictureUrl && (
                        <FontAwesome name='user' size={75} style={Style.placeholder} />)
                    }
                    <View style={Style.verticalContainerStretch}>
                        <Text style={Style.bigLabel}>{accountItem.username}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onItemRemoved(accountItem)} style={Style.buttonContainer}>
                        <FontAwesome name='remove' size={ICON_SIZE} style={Style.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AccountsView;