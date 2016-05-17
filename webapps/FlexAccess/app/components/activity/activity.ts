import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

import { NotificationService } from '../../shared/notification';
import { TextTransformPipe } from '../../pipes/text-transform.pipe';
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
    selected: boolean = false;

    constructor(
        private router: Router,
        private translate: TranslateService,
        private notifyService: NotificationService,
        private activityService: ActivityService
    ) { }

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
