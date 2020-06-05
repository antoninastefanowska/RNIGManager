import CryptoJS from 'crypto-js';

import { BACKEND_APP_ID, BACKEND_APP_SECRET } from './APIKeys';

const BASE_URL = 'https://socialsynchro.pythonanywhere.com/backend/';

class BackendClient {

    static async getFacebookCode(state) {
        let requestUrl = BASE_URL + 'get_facebook_code?state=' + state;
        let authorization = buildAuthorizationString();
        let response = await fetch(requestUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
        });
        let responseObj = await response.json();
        return responseObj['code'];
    }
}

function buildAuthorizationString() {
    let consumerKey = BACKEND_APP_ID;
    let consumerSecretKey = BACKEND_APP_SECRET;
    let timestamp = Math.round((new Date()).getTime() / 1000);
    let hashInput = timestamp + consumerKey;
    let rawSignature = CryptoJS.HmacSHA1(hashInput, consumerSecretKey);
    let signature = CryptoJS.enc.Base64.stringify(rawSignature);
    signature = signature.substring(0, signature.length - 1);

    return 'consumer_key=' + consumerKey +
        '&timestamp=' + timestamp +
        '&signature=' + signature;
}

export default BackendClient;