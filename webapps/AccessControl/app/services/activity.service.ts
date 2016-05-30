import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Activity } from '../models';

@Injectable()
export class ActivityService {

    constructor(private http: Http) { }

    fetchActivities(_params = {}) {
        let params: URLSearchParams = new URLSearchParams();
        for (let p in _params) {
            params.set(p, _params[p]);
        }

        let url = 'p?id=activity-view';
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
                    activities: <Activity[]>data.list,
                    meta: data.meta
                }
            });
    }
}
