export class EventFormModel{
    public title: string;
    public place: string;
    public description: string;
    public date_start: Date;
    public date_end: Date;
    public photo_event : File;
    public photo_filename : string;

    constructor(){
        this.date_start = new Date();
        this.date_end = new Date();
        this.description = "";
        this.place = "";
        this.title = "";
        this.photo_event;
        this.photo_filename = "";
    }
}