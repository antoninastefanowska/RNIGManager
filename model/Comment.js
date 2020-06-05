class Comment {
    constructor(id, timestamp, user, text) {
        this.id = id;
        this.timestamp = timestamp;
        this.user = user;
        this.text = text;
        this.author = null;
    }
}

export default Comment;