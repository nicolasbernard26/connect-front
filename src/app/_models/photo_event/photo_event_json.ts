import { WeakProfile } from '../weak_profile/weak_profile';

export class PhotoEventJson {
    id : number;
    photo : string;
    title : string;
    owner : WeakProfile;
}