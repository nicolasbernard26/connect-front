export class Profile {
    public tab_profile : string;
    public tab_connection : string;
    public tab_event : string;

    public tab_profile_text : string;
    public tab_event_text : string;

    constructor(type : string){
        if(type == "profile"){
            this.tab_event = "Mes événements";
            this.tab_connection = "Mes connections";
            this.tab_profile = ""
        } else if (type == "connection"){

        }
    }
}