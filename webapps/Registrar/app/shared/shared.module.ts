import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from './pagination';
import { DropdownComponent, DropdownToggleComponent } from './dropdown';
import { Tabs, Tab } from './tabs';
import { NotificationComponent, NotificationService } from './notification';

@NgModule({
    declarations: [
        PaginationComponent,
        NotificationComponent,
        Tabs, Tab,
        DropdownComponent, DropdownToggleComponent
    ],
    exports: [
        PaginationComponent,
        NotificationComponent,
        Tabs, Tab,
        DropdownComponent, DropdownToggleComponent
    ],
    imports: [CommonModule],
    providers: [
        NotificationService
    ]
})

export class SharedModule { }
