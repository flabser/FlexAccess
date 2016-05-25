import { Component, Inject } from '@angular/core';
import { Router, Routes, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { TextTransformPipe, DateFormatPipe } from '../pipes';
import { NotificationService } from '../shared/notification';
import { PaginationComponent } from '../shared/pagination';
import { Registration } from '../models';
import { RegistrationService } from '../services';

@Component({
    selector: '[registration-list]',
    template: require('../templates/registration-list.html'),
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe],
    directives: [PaginationComponent]
})

export class RegistrationListComponent {
    registrationList: Registration[];
    params: any = {};
    meta: any = {};
    request: string;
    selectedId: string = '';
    private to;

    constructor(
        private router: Router,
        private regService: RegistrationService,
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
        this.selectedId = '';
        this.request = 'loading';
        this.regService.fetchRegistered(params).subscribe(
            data => {
                this.registrationList = data.registrationList;
                this.meta = data.meta;
            },
            errorResponse => {
                this.handleXhrError(errorResponse);
                this.request = 'error';
            },
            () => {
                if (this.registrationList.length === 0) {
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

    setSelected(selectedId, event) {
        event.preventDefault();
        this.selectedId = selectedId;
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
