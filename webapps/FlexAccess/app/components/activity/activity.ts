import { Component, Inject, Input } from '@angular/core';
import { Router, RouteSegment, RouteTree, OnActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

import { NotificationService } from '../../shared/notification';
import { TextTransformPipe } from '../../pipes/text-transform.pipe';
import { AppService } from '../../services/app.service';
import { Activity } from '../../models/activity';
import { ActivityService } from '../../services/activity.service';
import { User } from '../../models/user';

@Component({
    selector: 'activity',
    template: require('./templates/activity.html'),
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class ActivityComponent {
    @Input() activity: Activity;
    isReady = false;
    selected: boolean = false;

    constructor(
        private router: Router,
        private routeSegment: RouteSegment,
        private translate: TranslateService,
        private notifyService: NotificationService,
        private appService: AppService,
        private activityService: ActivityService
    ) { }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        this.activityService.getActivityById(this.routeSegment.getParam('id')).subscribe(
            activity => this.activity = activity,
            error => this.handleXhrError(error)
        );
    }

    navigateToActivities() {
        this.router.navigate(['/activities']);
    }

    toggleSelected() {
        this.selected = !this.selected;
    }

    deleteProject() {
        this.activityService.deleteActivity([].concat(this.activity)).subscribe();
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
