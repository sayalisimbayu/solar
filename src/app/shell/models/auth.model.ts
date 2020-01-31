export class Auth {
    // constructor(
    //     public email: string,
    //     public password: string,
    // ) { }
    public email: string = 'sayali.simbayu.in';
    public password: string = '1234567';
}
export class Token {
    constructor(
        public token: string,
        public expires: Date,
    ) { }
}
