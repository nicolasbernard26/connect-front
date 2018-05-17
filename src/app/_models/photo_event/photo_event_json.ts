import { WeakProfile } from '../weak_profile/weak_profile';
import { WeakProfileJson } from '../weak_profile/weak_profile_json';

export class PhotoEventJson {
    id : number;
    photo : string;
    title : string;
    owner : WeakProfileJson;
}