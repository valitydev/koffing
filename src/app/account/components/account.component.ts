import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';

import { AuthService } from 'koffing/auth/auth.module';

@Component({
    selector: 'kof-account',
    templateUrl: 'account.component.pug',
    styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {

    public accountFrameUrl: SafeResourceUrl;

    constructor(
        private sanitizer: DomSanitizer
    ) { }

    public ngOnInit() {
        const keycloakUrl = AuthService.getAccountInfo().authUrl;
        const accountFrameUrl = `${_.trimEnd(keycloakUrl, '/')}/realms/external/account/`;
        this.accountFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(accountFrameUrl);
    }

}
