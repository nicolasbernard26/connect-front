import { User } from "../user/user";
import { Connections } from "../connections/connections"
import { Involve } from '../involve/involve';
import { WeakProfileJson } from './weak_profile_json';
import { StatusProfile } from '../status_profile'
import { Statement } from "@angular/compiler/src/output/output_ast";
import { BackURL } from "../../../config/url";

export class WeakProfile {
    public id : number;
    public avatar : string;
    public user : User;
    public filter : boolean;
    private statusProfile : StatusProfile;

    constructor(weakProfile : WeakProfileJson, statusProfile? : string){
        this.avatar = weakProfile.avatar ? BackURL + weakProfile.avatar : BackURL + "/media/default/no-photo2.png"
        this.id = weakProfile.id
        this.user = new User(weakProfile.user);
        this.filter = false;
        this.statusProfile = statusProfile ? StatusProfile[statusProfile] : StatusProfile.non_connection;
    }

    public fullName() : string {
        return this.user.first_name + " " + this.user.last_name;
    }

    public isFullProfilePage() : boolean{
        return this.statusProfile != StatusProfile.non_connection;
    }

    public isMyProfile() : boolean {
        return this.statusProfile == StatusProfile.profile;
    }

    public setBackgroundAvatar(): object {
        return { "background-image": "url(\"" + this.avatar + "\")" };
    }
}