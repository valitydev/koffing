import { Component, OnInit } from '@angular/core';

import { AuthService } from 'koffing/auth/auth.module';

@Component({
    selector: 'kof-offline-token',
    templateUrl: './offline-token.pug',
})
export class OfflineTokenComponent implements OnInit {

    public offlineToken: string;

    public privateToken: string;

    public ngOnInit() {
        this.offlineToken = AuthService.getOfflineToken();
        this.privateToken = AuthService.getAccountInfo().token;
    }
}
