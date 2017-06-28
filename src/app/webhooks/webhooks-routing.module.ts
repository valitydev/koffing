import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebhookComponent } from 'koffing/webhooks/webhook.component';
import { WebhooksItemComponent } from 'koffing/webhooks/webhook-item/webhooks-item.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'webhooks',
                component: WebhookComponent
            },
            {
                path: 'webhook/new',
                component: WebhooksItemComponent
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class WebhooksRoutingModule { }
