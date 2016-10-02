import { Component, Inject } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { Registration } from '../models';
import { RegistrationService } from '../services';

@Component({
    selector: '[registration-list]',
    template: require('../templates/registration-list.html')
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
        private route: ActivatedRoute,
        private regService: RegistrationService
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

    toggleSelected(selectedId, event) {
        event.preventDefault();
        if (this.selectedId === selectedId) {
            this.selectedId = '';
        } else {
            this.selectedId = selectedId;
        }
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
