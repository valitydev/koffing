import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { find } from 'lodash';

import { ToggleMenuBroadcaster } from 'koffing/broadcaster/broadcaster.module';
import { SidebarStateService } from './sidebarState.service';

@Component({
    selector: 'kof-app',
    templateUrl: './container.component.pug',
    encapsulation: ViewEncapsulation.None
})
export class ContainerComponent implements OnInit {

    public isSidebarOpened: boolean;
    public isSidebarDisabled: boolean;

    constructor(
        private router: Router,
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) {}

    public ngOnInit() {
        this.isSidebarOpened = SidebarStateService.isOpened();
        this.registerToggleMenuBroadcast();
        this.router.events.subscribe((navigation) => {
            if (navigation instanceof NavigationEnd) {
                const urlParts = navigation.url.split('/');
                this.isSidebarDisabled = Boolean(find(urlParts, (i) => i === 'account'));
            }
        });
    }

    private registerToggleMenuBroadcast() {
        this.toggleMenuBroadcaster.on().subscribe(() => {
            SidebarStateService.toggleState();
            this.isSidebarOpened = SidebarStateService.isOpened();
        });
    }
}
