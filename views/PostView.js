import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, FlatList, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import Carousel from 'react-native-snap-carousel';

import FacebookClient from '../services/FacebookClient';

import Style, { GRADIENT_COLORS, YELLOW } from '../utils/Style';
import StateManager from '../utils/StateManager';

class PostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.route.params.post,
            albumChildren: [],
            comments: [],
            loading: false
        }
        this.account = props.route.params.account;

        this.onResume = this.onResume.bind(this);
        this.renderListHeader = this.renderListHeader.bind(this);
        this.onShowOembedPressed = this.onShowOembedPressed.bind(this);
    }

    render() {
        return (
            <LinearGradient colors={GRADIENT_COLORS} style={Style.container}>  
                <FlatList
                    ListHeaderComponent={this.renderListHeader}
                    data={this.state.comments}
                    renderItem={({item}) => (<CommentItem commentItem={item} />)}
                    keyExtractor={item => item.id} />
            </LinearGradient>
        )
    }

    renderListHeader() {
        return (
            <View>
                <View style={Style.elementContainer}>
                    { this.state.post.mediaType === 'IMAGE' && (
                        <Image style={{width: '100%', aspectRatio: 1}} resizeMode='cover' source={{uri: this.state.post.mediaUrl}} />)
                    }
                    { this.state.post.mediaType === 'VIDEO' && (
                        <Video style={{width: '100%', aspectRatio: 1}} resizeMode={Video.RESIZE_MODE_COVER} source={{uri: this.state.post.mediaUrl}} rate={1.0} volume={1.0} useNativeControls={true} />)
                    }
                    { this.state.post.mediaType === 'CAROUSEL_ALBUM' && (
                        <Carousel
                            data={this.state.albumChildren}
                            renderItem={({item}) => (<ChildPostItem childItem={item} />)}
                            sliderWidth={Math.round(Dimensions.get('screen').width)}
                            itemWidth={Math.round(Dimensions.get('screen').width)}
                            loop={true} />)
                    }
                    <TouchableOpacity onPress={this.onShowOembedPressed} style={Style.buttonContainer}>
                        <View style={Style.horizontalContainer}>
                            <Text style={Style.bigLabel}>WYŚWIETL JAKO OEMBED</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={Style.italicLabel}>{formatDate(this.state.post.timestamp)}</Text>
                    <Text style={Style.captionLabel}>{this.state.post.caption}</Text>
                </View>
                <ProgressBar indeterminate={true} visible={this.state.loading} color={YELLOW} />
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
        this.loadComments();
        if (this.state.post.mediaType === 'CAROUSEL_ALBUM')
            this.loadAlbumChildren();
    }

    async loadComments() {
        StateManager.updateStateProperty(this, 'loading', true);
        let newData = [];
        let postID = this.state.post.id;
        let accessToken = this.account.accessToken;
        let commentIDs = await FacebookClient.getInstagramCommentsIDs(postID, accessToken);
        for (let commentID of commentIDs) {
            let comment = await FacebookClient.getInstagramCommentInfo(commentID, accessToken);
            comment.author = await FacebookClient.getInstagramAccountInfo(comment.user.id, accessToken);
            newData.push(comment);
        }
        StateManager.updateStateProperties(this,
            { name: 'comments', value: newData },
            { name: 'loading', value: false }
        );
    }

    async loadAlbumChildren() {
        StateManager.updateStateProperty(this, 'loading', true);
        let newData = [];
        let childrenIDs = this.state.post.children;
        let accessToken = this.account.accessToken;
        for (let childID of childrenIDs.data) {
            let child = await FacebookClient.getInstagramChildInfo(childID.id, accessToken);
            newData.push(child);
        }
        StateManager.updateStateProperties(this,
            { name: 'albumChildren', value: newData },
            { name: 'loading', value: false }
        );
    }

    onShowOembedPressed() {
        this.props.navigation.navigate('Oembed', { post: this.state.post });
    }
}

function CommentItem({commentItem}) {
    return (
        <View style={Style.elementContainer}>
            <View style={Style.horizontalContainer}>
                <Image style={{height: 75, aspectRatio: 1}} resizeMode='contain' source={{uri: commentItem.author.pictureUrl}} />
                <View style={Style.verticalContainerStretch}>
                    <Text style={Style.smallLabel}>{formatDate(commentItem.timestamp)}</Text>
                    <Text style={Style.italicLabel}>{commentItem.author.username}</Text>
                    <Text style={Style.label}>{commentItem.text}</Text>
                </View>
            </View>
        </View>
    );
}

function ChildPostItem({childItem}) {
    return (
        <Image style={{width: '100%', aspectRatio: 1}} source={{uri: childItem.mediaUrl}} />
    );
}

function formatDate(dateString) {
    return dateString.substring(0, 10) + ' ' + dateString.substring(11, 16);
}

export default PostView;