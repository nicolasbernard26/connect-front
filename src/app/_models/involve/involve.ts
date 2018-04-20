import { Event } from '../event/event';
import { InvolveJson } from './involve_json';

export class Involve {
    public event : Event;
    public filter : boolean = false;

    constructor(involve : InvolveJson){
        this.event = new Event();
        this.event.initializeFromJson(involve.event)
        this.filter = false;
    }
}