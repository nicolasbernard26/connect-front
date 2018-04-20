import { User } from "../user/user";
import { Connections } from "../connections/connections"
import { Involve } from '../involve/involve';
import { WeakProfile } from'../weak_profile/weak_profile';
import { ProfileJson } from './profile_json';
import { StatusProfile } from '../status_profile';


export class Profile extends WeakProfile {

    public token : string;
    public me : boolean;
    public connections : WeakProfile[];
    public involves : Involve[];

    constructor(profile : ProfileJson, statusProfile : string){
        super({id : profile.id, avatar : profile.avatar, user : profile.user}, statusProfile);

        this.me = profile.me;
        this.token = profile.token;

        if(profile.connections){
            this.connections = [];
            for(var connectionProfile of profile.connections){
                this.connections.push(new WeakProfile(connectionProfile, StatusProfile[StatusProfile.connection]))
            }
        }

        if(profile.involves){
            this.involves = [];
            for(var involve of profile.involves){
                this.involves.push(new Involve(involve))
            }
        }
    }

    
}