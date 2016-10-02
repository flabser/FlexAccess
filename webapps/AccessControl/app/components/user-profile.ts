import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { AppService } from '../services/app.service';
import { User } from '../models/user';

@Component({
    selector: '[user-profile]',
    template: require('../templates/user-profile.html')
})

export class UserProfileComponent {
    user: User = new User();
    form: FormGroup;

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
