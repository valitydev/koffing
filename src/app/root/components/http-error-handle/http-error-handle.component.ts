import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

import { HttpErrorBroadcaster } from 'koffing/broadcaster';

@Component({
    selector: 'kof-http-error-handle',
    templateUrl: 'http-error-handle.component.pug'
})
export class HttpErrorHandleComponent implements OnInit {
    public messages: Message[] = [];
    public lifeTime: number = 60000;

    constructor(private router: Router, private httpErrorBroadcaster: HttpErrorBroadcaster) {}

    public ngOnInit() {
        this.router.events.subscribe(() => (this.messages = []));

        this.httpErrorBroadcaster.on().subscribe((status: any) => {
            let message: string = '';
            if (status === 0 || (status >= 500 && status < 600)) {
                message = 'Произошла ошибка на сервере. Повторите действие позже.';
            }
            this.messages.push({
                severity: 'error',
                summary: `Код ошибки: ${status}`,
                detail: message
            });
        });
    }
}
