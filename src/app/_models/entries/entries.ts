import { WeakProfile } from '../weak_profile/weak_profile';
import { StatusProfile } from '../status_profile';

export class Entries {
    public entry : WeakProfile[];

    constructor(entries : WeakProfile[]){
        this.entry = [];
        for(var profile of entries){
            this.entry.push(new WeakProfile(profile));
        }
    }
}