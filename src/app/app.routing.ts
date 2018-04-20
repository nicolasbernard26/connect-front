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

const appRoutes: Routes = [
    // AUTHENTIFICATION :
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},

    // PROFILE :
    //{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},

    // EVENT :
    { path: 'event/:id/:selectedTab', component: EventComponent, canActivate: [AuthGuard]},
    { path: 'create-event', component: CreateEventComponent, canActivate: [AuthGuard]},
    { path: 'edit-event/:id', component: EditEventComponent, canActivate: [AuthGuard]},
    { path: 'upload-photos/:id', component: UploadPhotoEventComponent, canActivate:[AuthGuard]},

    // ERROR :
    { path: 'notfound', component: NotfoundComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '/notfound', canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);