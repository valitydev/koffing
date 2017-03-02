import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';

import { ClaimCreateBroadcaster } from 'koffing/broadcaster/services/claim-create.broadcaster.service';

@Component({
    selector: 'kof-notification-handle',
    templateUrl: 'notification-handle.component.pug'
})
export class NotificationHandleComponent implements OnInit {

    public messages: Message[] = [];
    public lifeTime: number = 3000;

    constructor(
        private claimCreateBroadcaster: ClaimCreateBroadcaster,
    ) {}

    public ngOnInit() {
        this.claimCreateBroadcaster.on().subscribe(() => {
            this.messages.push({
                severity: 'success',
                summary: '',
                detail: 'Заявка принята'
            });
        });
    }
}
