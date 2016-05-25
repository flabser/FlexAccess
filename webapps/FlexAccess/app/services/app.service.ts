import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models';
import { parseResponseObjects } from '../utils/obj-utils';

const HEADERS = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});

@Injectable()
export class AppService {

    private translations: any;

    constructor(private http: Http) { }

    getUserProfile() {
        let headers = { headers: HEADERS };
        let url = 'p?id=userprofile';

        return this.http.get(url, headers).map(response => {
            return parseResponseObjects(response.json().objects)
        });
    }

    getTranslations() {
        if (this.translations) {
            return Observable.of(this.translations);
        }

        let headers = { headers: new Headers({ 'Accept': 'application/json' }) };
        let url = 'p?id=common-captions';

        return this.http.get(url, headers).map(response => {
            this.translations = response.json().captions;
            return this.translations;
        });
    }

    updateUserProfile(user: User) {
        //
    }

    logout() {
        return this.http.delete('/');
    }
}
