import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { AppService } from '../services';
import { User } from '../models/user';

@Component({
    selector: 'app',
    template: require('../templates/app.html')
})

export class App {
    isReady: boolean = false;
    loggedUser: User;
    language: any;
    HEADER_TITLE: any = "Projects";
    isMobileDevice: Boolean;

    @HostListener('window:resize', ['$event.target']) resize(window) { this.onResize(window); };
    @HostBinding('class.phone') get device() { return this.isMobileDevice; };

    constructor(
        private router: Router,
        public translate: TranslateService,
        private appService: AppService
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

        this.appService.getUserProfile().subscribe((resp: any) => {
            this.loggedUser = resp.employee;
            this.language = resp.language
            this.isReady = true;
        });
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
