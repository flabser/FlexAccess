import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router, Routes, RouteTree, ROUTER_DIRECTIVES } from '@angular/router';

import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService, NotificationsComponent } from '../shared/notification';
import { Dropdown } from '../shared/dropdown/dropdown';

import { AppService } from '../services/app.service';
import { ActivityService } from '../services/activity.service';
import { ActivitiesComponent } from './activity/activities';
import { ActivityComponent } from './activity/activity';
import { UserProfileComponent } from './user-profile';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { User } from '../models/user';

@Component({
    selector: 'project-app',
    template: require('../templates/app.html'),
    directives: [ROUTER_DIRECTIVES, NotificationsComponent, Dropdown],
    providers: [NotificationService],
    pipes: [TranslatePipe]
})

@Routes([
    { path: '/', component: HomeComponent },
    { path: '/activities', component: ActivitiesComponent },
    { path: '/user-profile', component: UserProfileComponent },
    { path: '/login', component: LoginComponent }
])

export class App implements OnInit {
    loggedUser: User;
    HEADER_TITLE: any = "Projects";
    isMobileDevice: Boolean;

    @HostListener('window:resize', ['$event.target']) resize(window) { this.onResize(window); };
    @HostBinding('class.phone') get device() { return this.isMobileDevice; };

    constructor(
        private router: Router,
        public translate: TranslateService,
        public notificationService: NotificationService,
        private appService: AppService,
        private activityService: ActivityService
    ) { }

    ngOnInit() {
        this.loggedUser = new User();
        this.isMobileDevice = this.isMobile();

        // ng2-translate
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(userLang);

        this.translate.get('brand').subscribe(value => this.HEADER_TITLE = value);
    }

    logout(event) {
        event.preventDefault();
        // this.loggedUser = null;
        window.location.href = 'Logout';
    }

    goBack() {
        window.history.back();
    }

    preventDefault(event) {
        event.preventDefault();
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    onResize(window) {
        this.isMobileDevice = window.innerWidth <= 1024 || this.isMobile();
    }
}
