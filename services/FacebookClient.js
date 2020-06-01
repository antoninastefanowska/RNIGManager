import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from './APIKeys';
import Account from '../model/Account';
import Post from '../model/Post';
import Comment from '../model/Comment';

const BASE_URL = 'https://graph.facebook.com/v7.0/';
const CALLBACK_URL = 'https://socialsynchro.pythonanywhere.com/backend/post_facebook_code';

class FacebookClient {
    static getLoginUrl(state) {
        let scope = 'instagram_basic,pages_show_list';
        return 'https://www.facebook.com/v7.0/dialog/oauth?' + 
            'client_id=' + FACEBOOK_APP_ID + 
            '&redirect_uri=' + CALLBACK_URL + 
            '&state=' + state + 
            '&response_type=code' + 
            '&scope=' + scope;
    }

    static async getAccessToken(code) {
        let requestUrl = BASE_URL + 'oauth/access_token?' +
            'client_id=' + FACEBOOK_APP_ID +
            '&redirect_uri=' + CALLBACK_URL +
            '&client_secret=' + FACEBOOK_APP_SECRET +
            '&code=' + code;
        let response = await fetch(requestUrl);
        let responseObj = await response.json();
        return responseObj['access_token'];
    }

    static async inspectToken(token) {
        let requestUrl = BASE_URL + 'debug_token?' +
            'input_token=' + token +
            '&access_token=' + FACEBOOK_APP_ID + '|' + FACEBOOK_APP_SECRET;
        let response = await fetch(requestUrl);
        let responseObj = await response.json();
        return responseObj['user_id'];
    }

    static async getUserPagesIDs(accessToken) {
        let requestUrl = BASE_URL + 'me/accounts?' +
            'access_token=' + accessToken;
        let response = await fetch(requestUrl);
        let responseObj = await response.json();
        let pageIDs = [];
        for (let page of responseObj['data'])
            pageIDs.push(page['id']);
        return pageIDs;
    }

    static async getInstagramAccountID(pageID, accessToken) {
        let requestUrl = BASE_URL + pageID + 
            '?fields=instagram_business_account' + 
            '&access_token=' + accessToken;
        let response = await fetch(requestUrl);
        let responseObj = await response.json();
        let id = responseObj['instagram_business_account'] ? responseObj['instagram_business_account'].id : null;
        return id;
    }

    static async getInstagramAccountInfo(accountID, accessToken) {
        let requestUrl = BASE_URL + accountID +
            '?fields=id,username,profile_picture_url' +
            '&access_token=' + accessToken;
        let response = await fetch(requestUrl);
        let responseObj = await response.json();
        return new Account(responseObj['id'], responseObj['username'], responseObj['profile_picture_url']);
    }

    static async getInstagramPostIDs(accountID, accessToken) {
        let requestUrl = BASE_URL + accountID + '/media?' + 
            'access_token=' + accessToken;
        let response = await fetch(requestUrl);
        let responseObj = await response.json();
        let postIDs = [];
        for (let post of responseObj['data'])
            postIDs.push(post['id']);
        return postIDs;
    }

    static async getInstagramPostURL(postID, accessToken) {
        let requestUrl = BASE_URL + postID + 
            '?fields=media_url' +
            + '&access_token=' + accessToken;
        let response = await fetch(requestUrl);
        let responseObj = await response.json();
        return responseObj['media_url'];
    }

    static async getInstagramPostInfo(postID, accessToken) {
        let requestUrl = BASE_URL + postID + 
            '?fields=id,caption,comments,children,media_type,media_url,timestamp,permalink,thumbnail_url' +
            + '&access_token=' + accessToken;
        let response = await fetch(requestUrl);
        let responseObj = await response.json();
        console.log('getInstagramPostInfo:')
        console.log(responseObj);
        return new Post(responseObj['id'], responseObj['caption'], responseObj['media_type'], responseObj['timestamp'], responseObj['permalink'], responseObj['thumbnail_url']);
    }

    static async getInstagramCommentIDs(postID, accessToken) {
        let requestUrl = BASE_URL + postID + '/comments?' +
            + 'access_token=' + accessToken;
        let response = await fetch(requestUrl);
        let responseObj = await response.json();
        let commentIDs = [];
        for (let comment of responseObj['data'])
            commentIDs.push(comment['id']);
        return commentIDs;
    }

    static async getInstagramCommentInfo(commentID, accessToken) {
        let requestUrl = BASE_URL + commentID +
            '?fields=instagram_comment_id,created_at,instagram_user,message' +
            '&access_token=' + accessToken;
        let response = await fetch(requestUrl);
        let responseObj = await response.json();
        return new Comment(responseObj['instagram_comment_id'], responseObj['created_at'], responseObj['instagram_user'], responseObj['message']);
    }
}

export default FacebookClient;