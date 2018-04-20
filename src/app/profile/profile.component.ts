import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Component, Directive, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { ProfileService } from '../_services/profile.service';

import { TabComponent } from '../_component/tab.component';
import { OnDestroy, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthenticationService } from '../_services/index';
import { Profile } from '../_models/profile/profile';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
@Directive({ selector: '[mySpy]' })
export class ProfileComponent implements OnInit {

    form: FormGroup;
    loading: boolean = false;
    private id: number;
    private textView;
    public profile: Profile;

    @ViewChild('fileInput') fileInput: ElementRef;


    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private profileService: ProfileService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.route.params.subscribe(
            val => {
                this.profile = null;
                this.id = +this.route.snapshot.paramMap.get('id');
                console.log(this.route.snapshot.paramMap.get('selectedTab'));
                window.scrollTo(0, 0);
                this.profileService.getProfile(this.id, this.authenticationService.getToken()).subscribe(
                    data => {
                        this.profile = new Profile(data["profile"], data["relation"]);

                    },
                    err => {
                        console.log(err)
                    }
                );
            }
        )
    }

    createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            avatar: null
        });
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            this.form.get('avatar').setValue(file);
        }
    }

    private prepareSave(): any {
        let input = new FormData();
        input.append('avatar', this.form.get('avatar').value);
        return input;
    }

    onSubmit() {
        const formModel = this.prepareSave();
        console.log(this.prepareSave());
        this.loading = true;
        // In a real-world app you'd have a http request / service call here like
        var header: HttpHeaders = new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem("token"))
        //.set('Enctype', 'multipart/form-data');
        console.log(formModel)
        this.http.post('http://localhost:8000/API/account/profile/', formModel, { headers: header }).subscribe(
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
    }
}
