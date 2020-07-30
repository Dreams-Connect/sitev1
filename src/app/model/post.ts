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

