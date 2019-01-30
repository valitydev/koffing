import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { CreateWebhookService } from './create-webhook.service';
import { EventTypePresent } from './event-type-present';
import { TopicItem } from './topic-item';

@Component({
    selector: 'kof-webhook-item',
    templateUrl: 'create-webhook.component.pug',
    styleUrls: ['create-webhook.component.less'],
    providers: [CreateWebhookService]
})
export class CreateWebhookComponent implements OnInit {
    public shopID: string;

    public form: FormGroup;

    public invoiceEventTypes: EventTypePresent[];

    public customerEventTypes: EventTypePresent[];

    public topicItems: TopicItem[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private createWebhookService: CreateWebhookService
    ) {}

    public ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.shopID = params['shopID'];
        });
        this.form = this.createWebhookService.createWebhookGroup;
        this.invoiceEventTypes = this.createWebhookService.invoiceEventTypes;
        this.customerEventTypes = this.createWebhookService.customerEventTypes;
        this.topicItems = this.createWebhookService.topicItems;
    }

    public isTopicActive(topicValue: string) {
        return this.form.value.topic === topicValue;
    }

    public goBack() {
        this.router.navigate(['shop', this.shopID, 'webhooks']);
    }

    public createWebhook() {
        this.createWebhookService.createWebhook(this.shopID).subscribe(() => this.goBack());
    }

    public selectTopic() {
        this.createWebhookService.clearSelectedTypes();
    }
}
