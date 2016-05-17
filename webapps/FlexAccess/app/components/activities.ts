import { Component, Inject } from '@angular/core';
import { Router, Routes, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { TextTransformPipe } from '../pipes/text-transform.pipe';
import { DateFormatPipe } from '../pipes/date-format.pipe';

import { NotificationService } from '../shared/notification';
import { PaginationComponent } from '../shared/pagination';
import { Activity } from '../models/activity';
import { ActivityService } from '../services/activity.service';

@Component({
    selector: 'activities',
    template: require('../templates/activities.html'),
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe],
    directives: [PaginationComponent]
})

@Routes([
    { path: '/:id', component: ActivitiesComponent },
])

export class ActivitiesComponent {
    activities: Activity[];
    params: any = {};
    meta: any = {};

    constructor(
        private router: Router,
        private activityService: ActivityService,
        private notifyService: NotificationService
    ) { }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        if (curr.getParam('id')) {
            this.loadData({ docid: curr.getParam('id') });
        } else {
            this.loadData({});
        }
    }

    loadData(params?) {
        this.activityService.getActivities(params).subscribe(
            data => {
                this.activities = data.activities;
                this.meta = data.meta;
            },
            errorResponse => this.handleXhrError(errorResponse)
        );
    }

    goToPage(params) {
        this.loadData({ page: params.page });
    }

    searchRFId(event) {
        this.loadData({
            rfid: event.target.value
        });
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }

    preventDefault(event) {
        event.preventDefault();
    }
}
