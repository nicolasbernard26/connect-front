import { UserJson} from '../user/user_json';
import { WeakProfileJson } from '../weak_profile/weak_profile_json';
import { InvolveJson } from '../involve/involve_json';
import { User } from '../user/user';

export class ProfileJson {
    public id : number;
    public avatar : string;
    public avatar_name : string
    public user : UserJson;
    public token : string;
    public me : boolean;
    public connections : WeakProfileJson[];
    public involves : InvolveJson[];

    constructor() {
        this.id = Number.NaN;
        this.avatar = "";
        this.avatar_name = "";
        this.user = new UserJson();
        this.me = false;
        this.token = "";
        this.connections = [];
        this.involves = [];
    }
}