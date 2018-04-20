import { OnInit } from '@angular/core';

import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Profile } from '../_models/profile/profile';
import { ProfileService } from '../_services/profile.service'

export class TabComponent {
    // PROFILE :
    public currentProfile : Profile;


    @ViewChild('fileInput') fileInput: ElementRef;

    constructor( ) {
        this.currentProfile = JSON.parse(localStorage.getItem('profile'));
        this.currentProfile.avatar = "http://localhost:8000" + this.currentProfile.avatar;
    }

    /*createForm() {
        this.form = this.fb.group({
        name: ['', Validators.required],
        avatar: null
        });
    }

    onFileChange(event) {
        if(event.target.files.length > 0) {
        let file = event.target.files[0];
        this.form.get('avatar').setValue(file);
        }
    }

    private prepareSave(): any {
        let input = new FormData();
        input.append('name', this.form.get('name').value);
        input.append('avatar', this.form.get('avatar').value);
        return input;
    }

    onSubmit() {
        const formModel = this.prepareSave();
        console.log(this.prepareSave());
        this.loading = true;
        // In a real-world app you'd have a http request / service call here like
        var header : HttpHeaders = new HttpHeaders()
        .set('Authorization', 'Token ' + localStorage.getItem("token"))
        //.set('Enctype', 'multipart/form-data');
        console.log(formModel)
        this.http.post('http://localhost:8000/API/account/profile/', formModel, {headers: header}).subscribe(
        data => {
            console.log(data);
        },
        err => {
            console.log(err);
        }
        );
    }

    clearFile() {
        this.form.get('avatar').setValue(null);
        this.fileInput.nativeElement.value = '';
    }*/
    
    /*openTab(evt, name : string) {
        var i, tabcontent, tablinks;
        tablinks = document.getElementsByClassName("bar-item");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        evt.currentTarget.className += " active";

        tabcontent = document.getElementsByClassName("bar-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].className = tabcontent[i].className.replace(" current", "");
        } 
        document.getElementById(name).className += " current";       
    }

    initPage(nameBarItem : string, nameBarContent : string){
        var i, tabcontent, tablinks;
        tablinks = document.getElementsByClassName("bar-item");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(nameBarItem).className += " active";

        tabcontent = document.getElementsByClassName("bar-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].className = tabcontent[i].className.replace(" current", "");
        } 
        document.getElementById(nameBarContent).className += " current"; 
    }*/
}
