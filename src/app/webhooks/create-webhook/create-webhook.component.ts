import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup} from '@angular/forms';

import { CreateWebhookService } from './create-webhook.service';
import { EventTypePresent } from './event-type-present';

@Component({
    selector: 'kof-webhook-item',
    templateUrl: 'create-webhook.component.pug',
    providers: [CreateWebhookService]
})
export class CreateWebhookComponent implements OnInit  {

    public shopID: string;

    public form: FormGroup;

    public eventTypes: EventTypePresent[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private createWebhookService: CreateWebhookService) {}

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
        this.form = this.createWebhookService.createWebhookGroup;
        this.eventTypes = this.createWebhookService.eventTypes;
    }

    public goBack() {
        this.router.navigate(['shop', this.shopID, 'webhooks']);
    }

    public createWebhook() {
        this.createWebhookService.createWebhook(this.shopID)
            .subscribe(() => this.goBack());
    }
}
