import { UserJson} from '../user/user_json';
import { WeakProfileJson } from '../weak_profile/weak_profile_json';
import { InvolveJson } from '../involve/involve_json';

export class ProfileJson {
    public id : number;
    public avatar : string;
    public user : UserJson;
    public token : string;
    public me : boolean;
    public connections : WeakProfileJson[];
    public involves : InvolveJson[];
}