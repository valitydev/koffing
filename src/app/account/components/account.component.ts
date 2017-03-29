import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.accountFrameUrl = this.getAccountFrameUrl(params);
        });
    }

    private getAccountFrameUrl(params: Params): SafeResourceUrl {
        const accountPath = (params['path'] === 'edit') ? '' : params['path'];
        const url = `${_.trimEnd(AuthService.getAccountInfo().authUrl, '/')}/realms/external/account/${accountPath}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
