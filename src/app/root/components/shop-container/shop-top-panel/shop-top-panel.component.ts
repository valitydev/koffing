import { Component } from '@angular/core';

import { ToggleMenuBroadcaster } from 'koffing/broadcaster/broadcaster.module';

@Component({
    selector: 'kof-shop-top-panel',
    templateUrl: 'shop-top-panel.component.pug'
})
export class ShopTopPanelComponent {

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) { }

    public toggleMenu() {
        this.toggleMenuBroadcaster.fire();
    }
}
