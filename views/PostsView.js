import React, { Component } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import FacebookClient from '../services/FacebookClient';

import Style, { GRADIENT_COLORS, BLUE, ICON_SIZE } from '../utils/Style';
import StateManager from '../utils/StateManager';

class PostsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: []
        };
        this.account = props.route.params.account;

        this.onResume = this.onResume.bind(this);
        this.onPostItemPressed = this.onPostItemPressed.bind(this);
        this.onCreatePostPressed = this.onCreatePostPressed.bind(this);
    }

    render() {
        return (
            <LinearGradient colors={GRADIENT_COLORS} style={Style.container}>
                <TouchableOpacity onPress={this.onCreatePostPressed} style={Style.buttonContainer}>
                    <View style={Style.horizontalContainer}>
                        <Text style={Style.bigWhiteLabel}>UTWÓRZ</Text>
                        <MaterialIcons name='create' size={ICON_SIZE} style={Style.whiteIcon} />
                    </View>
                </TouchableOpacity>
                <ProgressBar indeterminate={true} visible={this.state.loading} color={BLUE} />
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (<PostItem postItem={item} onItemPressed={this.onPostItemPressed} />)}
                    keyExtractor={item => item.id} />
            </LinearGradient>
        );
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', this.onResume);
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.onResume);
    }

    onResume() {
        this.loadPosts();
    }

    async loadPosts() {
        StateManager.updateStateProperty(this, 'loading', true);
        let newData = [];
        let postIDs = await FacebookClient.getInstagramPostIDs(this.account.id, this.account.accessToken);
        for (let postID of postIDs) {
            let post = await FacebookClient.getInstagramPostInfo(postID, this.account.accessToken);
            newData.push(post);
        }
        StateManager.updateStateProperties(this,
            { name: 'data', value: newData },
            { name: 'loading', value: false }
        );
    }

    onPostItemPressed(postItem) {
        this.props.navigation.navigate('Post', { post: postItem, account: this.account })
    }

    onCreatePostPressed() {
        this.props.navigation.navigate('CreatePost');
    }
}

function PostItem({postItem, onItemPressed}) {
    return (
        <TouchableOpacity onPress={() => onItemPressed(postItem)}>
            <View style={Style.elementContainer}>
                <View style={Style.postContainer}>
                    <Image style={{width: '50%', height: '100%'}} resizeMode='cover' source={{uri: postItem.mediaType === 'VIDEO' ? postItem.thumbnailUrl : postItem.mediaUrl}} />
                    <View style={Style.verticalContainerStretch}>
                        <Text style={Style.italicLabel}>{formatDate(postItem.timestamp)}</Text>
                        <Text style={Style.label}>{postItem.caption}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function formatDate(dateString) {
    return dateString.substring(0, 10);
}

export default PostsView;