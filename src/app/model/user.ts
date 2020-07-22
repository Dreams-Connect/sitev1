export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public phone: string,
        public email: string,
        public password: string,
        public usertype: string,
        public community: any,
        public companyname: string,
        public vision: string
    ) {

    }
}

export class currentUser {
    constructor(
        public firstname: string,
        public lastname: string,
        public phone: string,
        public email: string,
        public usertype: string,
        public community: any,
        public companyname: string,
        public vision: string
    ) {

    }
}


// admin 
export class adminUser {
    constructor(
        public firstname: string,
        public lastname: string,
        public password: string,
        public phone: string,
        public email: string,
        public permissions: any,
    ) {

    }
}

export class currentAdmin {
    constructor(
        public firstname: string,
        public lastname: string,
        public phone: string,
        public email: string,
        public permissions: any,
    ) {

    }
}
