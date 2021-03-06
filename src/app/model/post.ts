export class Post {
    constructor(
        public id: string,
        public userUID: string,
        public name: string,
        public photoURL: any,
        public post: string,
        public community: string,
        public mediaList: any, // contains a list of media download or stream url[image,video,music/audio]
        public createdAt: any,
    ) {

    }
}


export class FeedPost {
    constructor(
        public id: string,
        public userUID: string,
        public name: string,
        public photoURL: any,
        public post: string,
        public community: string,
        public mediaList: any, // contains a list of media download or stream url[image,video,music/audio]
        public createdAt: any,
        public likes: any,
        public comments: number,
    ) {
    }
}

export class Comments {
    constructor(
        public commentId: any,
        public userUID: string,
        public photoURL: any,
        public name: string,
        public comment: any,
        public createdAt: string,
        public postID: string,
        public community: string,
        public nestedComments: any,
        public likes: any
    ) {}
}

export class NestedComments {
    constructor(
        public commentId: any,
        public userUID: string,
        public photoURL: any,
        public name: string,
        public comment: any,
        public createdAt: string,
        public postID: string,
        public community: string,
        public replyToUserName: string,
        public replyToUserUID: string,
        public parentCommentId: string,
        public likes: any
    ) {

    }
}

export class likesCounter {
    constructor(
        public postId: string,
        public userUIDs: any,
        public likes: number
    ) {

    }
}

