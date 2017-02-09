import { Component } from '@angular/core';

import { AuthService } from 'koffing/auth/auth.module';
import { ToggleMenuBroadcaster } from 'koffing/broadcaster/broadcaster.module';

@Component({
    selector: 'kof-top-panel',
    templateUrl: './top-panel.component.pug',
    styleUrls: [`.dropdown-toggle { cursor: pointer; }`]
})
export class TopPanelComponent {

    public profileName: string = AuthService.getAccountInfo().profileName;

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster
    ) { }

    public logout() {
        AuthService.logout();
    }

    public toggleMenu() {
        this.toggleMenuBroadcaster.fire();
    }
}
