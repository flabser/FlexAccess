import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';

import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { TAB_DIRECTIVES } from '../shared/tabs';
import { AppService } from '../services/app.service';
import { User } from '../models/user';

@Component({
    selector: '[user-profile]',
    template: require('../templates/user-profile.html'),
    directives: [FORM_DIRECTIVES, TAB_DIRECTIVES],
    providers: [FormBuilder],
    pipes: [TranslatePipe]
})

export class UserProfileComponent {
    user: User = new User();
    form: ControlGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private appService: AppService
    ) {
        this.form = formBuilder.group({
            login: [],
            pwd: [],
            pwd_confirm: [],
            email: []
        });
    }

    updateUserProfile() {
        this.appService.updateUserProfile(this.user);
    }

    close(event) {
        event.preventDefault();
        this.router.navigate(['/']);
    }
}
