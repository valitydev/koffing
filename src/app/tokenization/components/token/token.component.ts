import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { AuthService } from 'koffing/auth/auth.service';

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
        this.privateTokenTextarea.nativeElement.select();
        document.execCommand('copy');
    }
}
