class Account {
    constructor(id, username, pictureUrl) {
        this.id = id;
        this.username = username;
        this.pictureUrl = pictureUrl;
        this.accessToken = null;
    }
}

export default Account;