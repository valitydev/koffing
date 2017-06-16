import { Component } from '@angular/core';

import { AuthService } from 'koffing/auth/auth.module';
import { ToggleMenuBroadcaster } from 'koffing/broadcaster/broadcaster.module';
import { ConfigService } from 'koffing/backend/services/config.service';

@Component({
    selector: 'kof-top-panel',
    templateUrl: './top-panel.component.pug',
    styleUrls: [`.dropdown-toggle { cursor: pointer; }`]
})
export class TopPanelComponent {

    public profileName: string = AuthService.getAccountInfo().profileName;
    public mailHref: string = `mailto:${this.configService.supportEmail || 'support@rbkmoney.com'}`;

    constructor(
        private toggleMenuBroadcaster: ToggleMenuBroadcaster,
        private configService: ConfigService
    ) { }

    public logout() {
        AuthService.logout();
    }

    public toggleMenu() {
        this.toggleMenuBroadcaster.fire();
    }
}
