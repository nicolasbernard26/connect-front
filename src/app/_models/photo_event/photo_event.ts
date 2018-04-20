import { WeakProfile } from '../weak_profile/weak_profile';
import { PhotoEventJson } from './photo_event_json';
import { BackURL } from '../../../config/url';


export class PhotoEvent {
    photo : string;
    title : string;
    owner : WeakProfile;
    id : number

    constructor( photoEventJson : PhotoEventJson ) {
        this.photo = photoEventJson.photo ? BackURL + photoEventJson.photo : BackURL + "/media/default/no-photo2.png"
        this.title = photoEventJson.title;
        this.owner = new WeakProfile(photoEventJson.owner);
        this.id = photoEventJson.id;
    }

    public setBackground(): object {
        return { 
            "background-image": "url(\"" + this.photo + "\")",
            "position": "relative",
            "background-repeat": "no-repeat",
            "background-position": "center center",
            "background-size": "cover"
        };
    }
}