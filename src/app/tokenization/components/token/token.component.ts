import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { AuthService } from 'koffing/auth/auth.service';
import { copy } from 'koffing/common/copy';

@Component({
    selector: 'kof-offline-token',
    templateUrl: './token.component.pug',
})
export class TokenComponent implements OnInit {

    public privateToken: string;

    @ViewChild('privateTokenTextarea')
    public privateTokenTextarea: ElementRef;

    public ngOnInit() {
        this.privateToken = AuthService.getAccountInfo().token;
    }

    public copy() {
        copy(this.privateTokenTextarea.nativeElement);
    }
}
