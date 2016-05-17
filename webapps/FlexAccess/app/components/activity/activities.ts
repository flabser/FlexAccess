import { Component, Inject } from '@angular/core';
import { Router, Routes, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { TextTransformPipe } from '../../pipes/text-transform.pipe';

import { NotificationService } from '../../shared/notification';
import { PaginationComponent } from '../../shared/pagination';
import { Activity } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';
import { ActivityComponent } from './activity';

@Component({
    selector: 'activities',
    template: require('./templates/activities.html'),
    pipes: [TranslatePipe, TextTransformPipe],
    directives: [PaginationComponent, ActivityComponent]
})

export class ActivitiesComponent {
    activities: Activity[];
    selectedActivity: Activity;
    params: any = {};
    meta: any = {};

    constructor(
        private router: Router,
        private activityService: ActivityService,
        private notifyService: NotificationService
    ) { }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        this.loadData();
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
        this.loadData({
            page: params.page
        });
    }

    search(event) {
        console.log(event.target.value);
    }

    deleteActivity() { }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
