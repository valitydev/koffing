import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToggleMenuBroadcaster } from 'koffing/broadcaster/broadcaster.module';
import { SidebarStateService } from './sidebarState.service';

@Component({
    selector: 'kof-app',
    templateUrl: './container.component.pug',
    encapsulation: ViewEncapsulation.None
})
export class ContainerComponent implements OnInit {

    public isSidebarOpened: boolean;

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) { }

    public ngOnInit() {
        this.isSidebarOpened = SidebarStateService.isOpened();
        this.registerToggleMenuBroadcast();
    }

    private registerToggleMenuBroadcast() {
        this.toggleMenuBroadcaster.on().subscribe(() => {
            SidebarStateService.toggleState();
            this.isSidebarOpened = SidebarStateService.isOpened();
        });
    }
}
