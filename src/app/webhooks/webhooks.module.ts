import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WebhooksComponent } from './webhooks.component';
import { WebhooksListDetailsComponent } from './webhook-details/webhook-details.component';
import { CommonModule } from 'koffing/common/common.module';
import { CreateWebhookComponent } from './create-webhook/create-webhook.component';
import { WebhookStatusPipe } from './webhook-status.pipe';
import { WebhookTopicPipe } from './webhook-topic.pipe';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [
        WebhooksComponent,
        WebhooksListDetailsComponent,
        CreateWebhookComponent,
        WebhookStatusPipe,
        WebhookTopicPipe
    ]
})
export class WebhooksModule {}
