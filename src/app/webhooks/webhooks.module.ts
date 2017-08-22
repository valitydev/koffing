import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WebhookComponent } from './webhook.component';
import { WebhooksListDetailsComponent } from './webhook-details/webhook-details.component';
import { CommonModule } from 'koffing/common/common.module';
import { CreateWebhookComponent } from './create-webhook/create-webhook.component';
import { WebhookStatusPipe } from './webhook-status.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        WebhookComponent,
        WebhooksListDetailsComponent,
        CreateWebhookComponent,
        WebhookStatusPipe
    ]
})
export class WebhooksModule { }
