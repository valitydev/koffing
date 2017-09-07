import { Component, OnInit } from '@angular/core';

import { AuthService } from 'koffing/auth/auth.service';

@Component({
    selector: 'kof-offline-token',
    templateUrl: './token.component.pug',
})
export class TokenComponent implements OnInit {

    public privateToken: string;

    public ngOnInit() {
        this.privateToken = AuthService.getAccountInfo().token;
    }
}
