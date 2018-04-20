import { WeakProfileJson } from '../weak_profile/weak_profile_json';
import { PhotoEvent } from '../photo_event/photo_event'

export class EventJson{

    public id : number
    public title: string;
    public admin: WeakProfileJson;
    public place: string;
    public description: string;
    public date_start: string;
    public date_end: string;
    public date_start_form: Date;
    public date_end_form: Date;
    public theme: number;
    public visible : boolean;
    public photo_event;
    public entries : WeakProfileJson[];
    public photo_event_filename : string;

    constructor(){
        this.date_start = "";
        this.date_end = "";
        this.description = "";
        this.place = "";
        this.theme = 0;
        this.title = "";
        this.photo_event_filename = "";
    }
}