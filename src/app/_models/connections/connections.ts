import { WeakProfile } from '../weak_profile/weak_profile';
import { ConnectionsJson } from'./connection_json';
import { StatusProfile } from '../status_profile';


export class Connections {
    public profiles : WeakProfile[];

    constructor(connections : ConnectionsJson){
        this.profiles = [];
        for(var profile of connections.profile){
            this.profiles.push(new WeakProfile(profile, StatusProfile[StatusProfile.connection]));
        }
    }
}