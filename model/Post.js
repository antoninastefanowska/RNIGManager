class Post {
    constructor(id, caption, mediaType, mediaUrl, timestamp, permalink, thumbnailUrl, children) {
        this.id = id;
        this.caption = caption;
        this.mediaType = mediaType;
        this.mediaUrl = mediaUrl;
        this.timestamp = timestamp;
        this.permalink = permalink;
        this.thumbnailUrl = thumbnailUrl;
        this.children = children;
        this.oembed = null;
    }
}

export default Post;