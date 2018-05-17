import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';

// AUTHENTICATION :
import { LogoutComponent } from './authentication/logout/logout.component'
import { LoginComponent } from './authentication/login/login.component';

// PROFILE :
import { ProfileComponent } from './profile/profile.component';

// EVENT :
import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './event/create-event/create-event.component';

// ERROR :
import { NotfoundComponent } from './basic/notfound/notfound.component';
import { NotExpr } from '@angular/compiler/src/output/output_ast';
import { UploadPhotoEventComponent } from './event/upload-photo-event/upload-photo-event.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { HomeComponent } from './home/home.component';
import { NicolasBernardComponent } from './nicolas-bernard/nicolas-bernard.component';
import { CvComponent } from './nicolas-bernard/cv/cv.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';

const appRoutes: Routes = [
    // AUTHENTIFICATION :
    { path: 'connect/sign-up', component: SignUpComponent },
    { path: 'connect/login', component: LoginComponent },
    { path: 'connect/logout', component: LogoutComponent, canActivate: [AuthGuard]},

    // PROFILE :
    //{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'connect/profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},

    // EVENT :
    { path: 'connect/event/:id/:selectedTab', component: EventComponent, canActivate: [AuthGuard]},
    { path: 'connect/create-event', component: CreateEventComponent, canActivate: [AuthGuard]},
    { path: 'connect/edit-event/:id', component: EditEventComponent, canActivate: [AuthGuard]},
    { path: 'connect/upload-photos/:id', component: UploadPhotoEventComponent, canActivate:[AuthGuard]},

    // ERROR :
    { path: 'connect/notfound', component: NotfoundComponent, canActivate: [AuthGuard]},

    { path: 'home', component: HomeComponent},
    { path: 'nicolasbernard', component: NicolasBernardComponent},
    { path: 'nicolasbernard/cv', component: CvComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'},

    // otherwise redirect to home
    { path: '**', redirectTo: '/notfound', canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);