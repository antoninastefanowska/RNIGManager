import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import InstagramClient from '../services/InstagramClient';

import StateManager from '../utils/StateManager';
import Style from '../utils/Style';

class OembedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlDocument: '<div style="display:flex;justify-content:center;align-items:center;font-size:30px"><h>Loading...</h></div>'
        }
        this.post = props.route.params.post;

        this.onResume = this.onResume.bind(this);
    }

    render() {
        return (
            <View style={Style.container}>            
                <WebView style={Style.container} source={{html: this.state.htmlDocument}} />
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
        this.loadOembed();
    }

    async loadOembed() {
        let htmlDocument = await InstagramClient.getOembed(this.post.permalink);
        htmlDocument = htmlDocument.replace(`<script async src="//www.instagram.com/embed.js">`, `<script async src="http://www.instagram.com/embed.js">`)
        htmlDocument = '<div style="display:flex;justify-content:center;align-items:center">' + htmlDocument + '</div>';
        StateManager.updateStateProperty(this, 'htmlDocument', htmlDocument);
    }
}

export default OembedView;