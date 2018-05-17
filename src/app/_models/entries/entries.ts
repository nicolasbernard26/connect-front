import { WeakProfile } from '../weak_profile/weak_profile';
import { StatusProfile } from '../status_profile';
import { WeakProfileJson } from '../weak_profile/weak_profile_json';

export class Entries {
    public entry : WeakProfile[];

    constructor(entries : WeakProfileJson[]){
        this.entry = [];
        for(var profile of entries){
            this.entry.push(new WeakProfile(profile));
        }
    }
}