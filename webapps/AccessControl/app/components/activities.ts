import { Component, Inject } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { Activity } from '../models';
import { ActivityService } from '../services';

@Component({
    selector: '[activities]',
    template: require('../templates/activities.html')
})

export class ActivitiesComponent {
    activities: Activity[];
    params: any = {};
    meta: any = {};
    request: string;
    activeActivityId: string = '';
    private to;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private activityService: ActivityService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = params['id'];

            if (id) {
                this.loadData({ docid: id });
            } else {
                this.loadData({});
            }
        });
    }

    loadData(params?) {
        this.activeActivityId = '';
        this.request = 'loading';
        this.activityService.fetchActivities(params).subscribe(
            data => {
                this.activities = data.activities;
                this.meta = data.meta;
            },
            errorResponse => {
                this.handleXhrError(errorResponse);
                this.request = 'error';
            },
            () => {
                if (this.activities.length === 0) {
                    this.request = 'empty';
                } else {
                    this.request = 'loaded';
                }
            }
        );
    }

    goToPage(params) {
        this.loadData({ page: params.page });
    }

    searchRFId(event) {
        clearTimeout(this.to);
        this.to = setTimeout(() => {
            this.loadData({ rfid: event.target.value });
        }, 300);
    }

    goToActivity(activityId, event) {
        event.preventDefault();
        this.activeActivityId = activityId;
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
