import { Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { App } from './components/app';
import { HomeComponent } from './components/home';
import { ActivitiesComponent } from './components/activities';
import { UserProfileComponent } from './components/user-profile';
import { LoginComponent } from './components/login';

export const APP_ROUTES: Routes = [
    { path: '', component: ActivitiesComponent, canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: ActivitiesComponent, canActivate: [AuthGuard] }
];
