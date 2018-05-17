export class UserJson {
    username : string;
    first_name : string;
    last_name : string;
    email : string;
    token : string;
    public password : string;
    public confirm_password : string;

    constructor() {
        this.username = "";
        this.first_name = "";
        this.last_name = "";
        this.email = "";
        this.token = "";
        this.password = "";
        this.confirm_password = "";
    }
}