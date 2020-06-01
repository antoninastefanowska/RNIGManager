import React, { Component } from 'react';
import { View, FlatList, Button, Text, Image, TouchableOpacity } from 'react-native';

import Style from '../Style';

class PostsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.accountID = null;

        this.onCreatePostPressed = this.onCreatePostPressed.bind(this);
    }

    render() {
        return (
            <View style={Style.container}>
                <Button title='Utwórz' style={Style.input} onPress={this.onCreatePostPressed} />
            </View>
        );
    }

    onCreatePostPressed() {
        this.props.navigation.navigate('CreatePost');
    }
}

function PostItem({postItem}) {
    return (
        <TouchableOpacity>
            <View style={Style.elementContainer}>
                
            </View>
        </TouchableOpacity>
    )
}

export default PostsView;