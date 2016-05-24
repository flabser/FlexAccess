import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Registration } from '../models';

@Injectable()
export class RegistrationService {

    constructor(private http: Http) { }

    fetchRegistered(_params = {}) {
        let params: URLSearchParams = new URLSearchParams();
        for (let p in _params) {
            params.set(p, _params[p]);
        }

        let url = 'p?id=registration-view';
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Accept': 'application/json'
        });

        return this.http.get(url, {
            headers: headers,
            search: params
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    registrationList: <Registration[]>data.list,
                    meta: data.meta
                }
            });
    }
}
