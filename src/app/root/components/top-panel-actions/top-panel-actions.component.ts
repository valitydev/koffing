import { Component } from '@angular/core';
import { AuthService } from 'koffing/auth/auth.service';
import { ConfigService } from 'koffing/backend/config.service';

@Component({
    selector: 'kof-top-panel-actions',
    templateUrl: 'top-panel-actions.component.pug',
    styles: [`.dropdown-toggle { cursor: pointer; }`]
})
export class TopPanelActionsComponent {

    public profileName: string = AuthService.getAccountInfo().profileName;
    public mailHref: string = `mailto:${this.configService.supportEmail || 'support@rbkmoney.com'}`;

    constructor(private configService: ConfigService) { }

    public logout() {
        AuthService.logout();
    }
}
