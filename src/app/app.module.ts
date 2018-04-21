
import { ProfileComponent } from './profile/profile.component';

import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button'

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './_guards/index';

import { AuthenticationService, ProfileService, EventService } from './_services/index';

import { routing } from './app.routing';

// AUTHENTICATION :
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';

// BASIC :
import { FooterComponent } from './basic/footer/footer.component';
import { MenuComponent } from './basic/menu/menu.component';

// PROFILE :
import { ConnectionsComponent } from './profile/connections/connections.component';
import { InvolvesComponent } from './profile/involves/involves.component';
import { FullProfileComponent } from './profile/fullprofile/fullprofile.component';

// EVENT :
import { EventComponent } from './event/event.component';
import { EntriesComponent } from './event/entries/entries.component';
import { PhotosComponent } from './event/photos/photos.component';
import { HomeEventComponent } from './event/home/home.component';
import { NotfoundComponent } from './basic/notfound/notfound.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { AddEntriesComponent } from './event/add-entries/add-entries.component';
import { httpInterceptorProviders } from './_interceptors/index';
import { ErrorService } from './_services/error.service';
import { UploadPhotoEventComponent } from './event/upload-photo-event/upload-photo-event.component';
import { ConfirmPopinComponent } from './basic/confirm-popin/confirm-popin.component';
import { PhotosService } from './_services/photos.service';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { AuthorizationErrorComponent } from './basic/authorization-error/authorization-error.component';
import { NicolasBernardComponent } from './nicolas-bernard/nicolas-bernard.component';
import { CvComponent } from './nicolas-bernard/cv/cv.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		AppComponent,

		// BASIC :
		FooterComponent,
		MenuComponent,

		// AUTHENTICATION :
		LogoutComponent,
		LoginComponent,

		// PROFILE :
		ProfileComponent,
		ConnectionsComponent,
		InvolvesComponent,
		FullProfileComponent,

		// EVENT :
		EventComponent,
		EntriesComponent,
		PhotosComponent,
		HomeEventComponent,

		// ERROR :
		NotfoundComponent,

		CreateEventComponent,
		AddEntriesComponent,
		UploadPhotoEventComponent,
		ConfirmPopinComponent,
		EditEventComponent,
		AuthorizationErrorComponent,
		NicolasBernardComponent,
		CvComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		routing,
		CalendarModule,
		ButtonModule,
		PanelModule,
		CommonModule
	],
	providers: [
		AuthGuard,
		AuthenticationService,
		ProfileService,
		EventService,
		ErrorService,
		PhotosService,
		httpInterceptorProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
