import { Profile } from '../profile/profile';
import { PhotoEvent } from '../photo_event/photo_event';
import { WeakProfile } from '../weak_profile/weak_profile';
import { EventJson } from './event_json';
import { StatusProfile } from '../status_profile';
import { BackURL } from '../../../config/url';

var days : string[] = [
    "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
]

var months : string[] = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
]

export class Event{

    public id : number;
    public title: string;
    public admin: WeakProfile;
    public place: string;
    public description: string;
    public date_start: Date;
    public date_end: Date;
    public theme: number;
    public visible : boolean;
    public entries : WeakProfile[];
    public filter : boolean;
    public photo_event : string;

    constructor(){
    }

    public initializeForForm(){
        //console.log(event.date_start)
        this.date_start = new Date()
        this.date_end = new Date()
        this.description = "";
        this.place = "";
        this.theme = 0;
        this.title = "";
    }

    public initializeFromJson(event : EventJson){
        this.id = event.id;
        this.admin = new WeakProfile(event.admin);
        this.date_start = this.createDate(event.date_start)
        this.date_end = this.createDate(event.date_end)
        this.description = event.description;
        this.place = event.place;
        this.theme = event.theme;
        this.title = event.title;
        if( event.photo_event ){
            this.photo_event = BackURL + event.photo_event;
        } else {
            this.photo_event = BackURL + "/media/default/no-photo2.png";
        }
        if(event.entries){
            this.entries = [];
            for(var entry of event.entries){
                this.entries.push(new WeakProfile(entry));
            }
        }
        this.visible = false;
    }

    public getFullDate(){
        var day = days[this.date_start.getDay()];
        var date = this.date_start.getDate();
        var month = "";
        var year = "";
        //console.log(new Date())
        if(this.date_start.getFullYear() != new Date().getFullYear()) {
            year = " " + this.date_start.getFullYear();
            month = " " + months[this.date_start.getMonth()]
        } else {
            if(this.date_start.getMonth() != new Date().getMonth()) {
                month = " " + months[this.date_start.getMonth()];
            }
        }
        
        return day + " " + date + month + year;
    }

    public changeVisible(){
        this.visible = !this.visible;
    }

    private createDate(date_string : string) : Date {
        var date : Date = new Date();
        date.setFullYear(Number(date_string.split('T')[0].split('-')[0]));
        date.setMonth(Number(date_string.split('T')[0].split('-')[1]) - 1);
        date.setDate(Number(date_string.split('T')[0].split('-')[2]))
        //console.log(date)
        return date;
    }
}