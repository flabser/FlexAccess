import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Activity } from '../models/Activity';
import { serializeObj } from '../utils/obj-utils';

const VIEW_URL = 'p?id=activity-view';
const HEADER = {
    headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept': 'application/json'
    })
};

@Injectable()
export class ActivityService {

    constructor(private http: Http) { }

    getActivities(_params = {}) {
        let params: URLSearchParams = new URLSearchParams();
        for (let p in _params) {
            params.set(p, _params[p]);
        }

        return this.http.get(VIEW_URL, {
            headers: HEADER.headers,
            search: params
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    activities: <Activity[]>data.list,
                    meta: data.meta
                }
            });
    }
}
