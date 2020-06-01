import React, { Component } from 'react';
import { View, Button, TouchableOpacity, FlatList, Image, Text } from 'react-native';

import Style from '../Style';

class AccountsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

        this.onResume = this.onResume.bind(this);
        this.onAddAccountsClick = this.onAddAccountsClick.bind(this);
        this.loadNewAccounts = this.loadNewAccounts.bind(this);
    }

    render() {
        return (
            <View style={Style.container}>
                <Button title='Dodaj' style={Style.input} onPress={this.onAddAccountsClick} />
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (<AccountItem accountItem={item} />)}
                    keyExtractor={item => item.id} />
            </View>
        );
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', this.onResume);
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.onResume);
    }

    onResume() {
        if (this.props.route.params && this.props.route.params.accounts)
            this.loadNewAccounts();
    }

    updateStateProperty(property, value) {
        let newState = this.state;
        newState[property] = value;
        this.setState(newState);
    }

    updateStateProperties(...properties) {
        let newState = this.state;
        for (let i = 0; i < properties.length; i++)
            newState[properties[i].name] = properties[i].value;
        this.setState(newState);
    }

    onAddAccountsClick() {
        this.props.navigation.navigate('Login');
    }

    loadNewAccounts() {
        let newAccounts = this.props.route.params.accounts;
        let newData = this.state.data;
        for (let newAccount of newAccounts)
            newData.push(newAccount);
        this.updateStateProperty('data', newData);
    }
}

function AccountItem({accountItem}) {
    return (
        <TouchableOpacity>
            <View style={Style.elementContainer}>
                <View style={Style.horizontalContainer}>
                    <Image style={{width: 50, height:50}} resizeMode='contain' source={{uri: accountItem.pictureUrl}} />
                    <View style={Style.verticalContainerStretch}>
                        <Text style={Style.label}>{accountItem.username}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AccountsView;