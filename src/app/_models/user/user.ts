import { UserJson } from './user_json';

export class User {
    username : string;
    first_name : string;
    last_name : string;
    email : string;
    token : string;

    constructor(user : UserJson){
        this.username = String(user.username);
        this.first_name = String(user.first_name);
        this.last_name = String(user.last_name);
        this.email = String(user.email);
    }
}