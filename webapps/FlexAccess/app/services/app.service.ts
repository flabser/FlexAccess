import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

@Injectable()
export class AppService {

    private translations: any;

    constructor(private http: Http) { }

    getTranslations() {
        if (this.translations) {
            return Observable.of(this.translations);
        }

        let header = { headers: new Headers({ 'Accept': 'application/json' }) };
        let url = 'p?id=common-captions';

        return this.http.get(url, header).map(response => {
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
