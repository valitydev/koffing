import { Component, OnDestroy, OnInit } from '@angular/core';

import { ToggleMenuBroadcaster } from 'koffing/broadcaster';
import { SidebarStateService } from './sidebar-state.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: 'shop-container.component.pug'
})
export class ShopContainerComponent implements OnInit, OnDestroy {

    public isSidebarOpened: boolean;
    private toggleMenuSubscription: Subscription;

    constructor(private toggleMenuBroadcaster: ToggleMenuBroadcaster) { }

    public ngOnInit() {
        this.isSidebarOpened = SidebarStateService.isOpened();
        this.registerToggleMenuBroadcast();
    }

    public ngOnDestroy() {
        this.toggleMenuSubscription.unsubscribe();
    }

    private registerToggleMenuBroadcast() {
        this.toggleMenuSubscription = this.toggleMenuBroadcaster.on()
            .subscribe(() => {
                SidebarStateService.toggleState();
                this.isSidebarOpened = SidebarStateService.isOpened();
            });
    }
}
