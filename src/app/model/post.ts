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

export class Comment {
    constructor(
        public id: string,
        public userUID: string,
        public name: string,
        public photoURL: any,
        public comment: string,
        public community: string,
        public postID: string,
        public likes: number
    ) {

    }
}

export class likesCounter {
    constructor(
        public postId:string,
        public userUID: string,
        public likes: number
    ) {

    }
}

