export class Post {
    constructor(
        public id: string,
        public userUID: string,
        public community: string,
        public mediaList: any, // contains a list of media download or stream url[image,video,music/audio]
        public timestamp: string,
        ) {

    }
}

