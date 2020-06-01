const BASE_URL = 'https://api.instagram.com/';

class InstagramClient {
    
    static async getOembed(postUrl) {
        let requestUrl = BASE_URL + '/oembed?url=' + postUrl;
        let response = await fetch(requestUrl);
        let responseJson = await response.json();
        return responseJson;
    }
}

export default InstagramClient;