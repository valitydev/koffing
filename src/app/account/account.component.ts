import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { trimEnd } from 'lodash';

import { AuthService } from 'koffing/auth/auth.service';

@Component({
    selector: 'kof-account',
    templateUrl: 'account.component.pug',
    styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {

    public accountFrameUrl: SafeResourceUrl;
    public accountRouterLinks: object[];

    constructor(
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.initAccountRouterLinks();
        this.route.params.subscribe((params: Params) => {
            this.accountFrameUrl = this.getAccountFrameUrl(params);
        });
    }

    private getAccountFrameUrl(params: Params): SafeResourceUrl {
        const accountPath = (params['path'] === 'edit') ? '' : params['path'];
        const url = `${trimEnd(AuthService.getAccountInfo().authUrl, '/')}/realms/external/account/${accountPath}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    private initAccountRouterLinks() {
        this.accountRouterLinks = [
            {
                routePath: 'edit',
                label: 'Учетная запись'
            },
            {
                routePath: 'password',
                label: 'Пароль'
            },
            {
                routePath: 'totp',
                label: 'Аутентификатор'
            },
            {
                routePath: 'sessions',
                label: 'Сессии'
            },
            {
                routePath: 'applications',
                label: 'Приложения'
            },
            {
                routePath: 'log',
                label: 'Логи'
            },
        ];
    }
}
