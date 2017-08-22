import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { forEach } from 'lodash';

import { EventTypePresent } from '../create-webhook/event-type-present';
import { WebhooksService } from 'koffing/backend/webhooks.service';
import { WebhookParams } from 'koffing/backend/requests/webhook-params';
import { Webhook } from 'koffing/backend/model/webhook';

@Injectable()
export class CreateWebhookService {

    public createWebhookGroup: FormGroup;

    public eventTypes: EventTypePresent[] = [
        new EventTypePresent('InvoiceCreated', 'создан новый инвойс'),
        new EventTypePresent('InvoicePaid', 'инвойс перешел в состояние "Оплачен"'),
        new EventTypePresent('InvoiceCancelled', 'инвойс отменен по истечению срока давности'),
        new EventTypePresent('InvoiceFulfilled', 'инвойс успешно погашен'),
        new EventTypePresent('PaymentStarted', 'создан платеж'),
        new EventTypePresent('PaymentCaptured', 'платеж успешно завершен'),
        new EventTypePresent('PaymentFailed', 'при проведении платежа возникла ошибка')
    ];

    constructor(private fb: FormBuilder,
                private webhooksService: WebhooksService) {
        this.createWebhookGroup = this.prepareForm(this.eventTypes);
        this.createWebhookGroup.controls.eventTypes.setValidators(this.eventTypesValidator);

    }

    public createWebhook(shopID: string): Observable<Webhook> {
        if (this.createWebhookGroup.valid && shopID) {
            const params = this.toWebhookParams(shopID, this.createWebhookGroup.controls);
            return this.webhooksService.createWebhook(params);
        } else {
            return Observable.throw('Webhook form group is not valid or shopID is null');
        }
    }

    private toWebhookParams(shopID: string, controls: any): WebhookParams {
        const eventTypes: string[] = [];
        forEach(controls.eventTypes.value, (checked: boolean, eventTypeName: string) => {
            if (checked) {
                eventTypes.push(eventTypeName);
            }
        });
        return {
            url: controls.url.value,
            scope: {
                topic: 'InvoicesTopic',
                shopID,
                eventTypes
            }
        };
    }

    private prepareForm(eventTypes: EventTypePresent[]): FormGroup {
        return this.fb.group({
            url: ['', Validators.required],
            eventTypes: this.fb.group(this.prepareEventTypesGroup(eventTypes))
        });
    }

    private prepareEventTypesGroup(eventTypes: EventTypePresent[]): FormGroup {
        const controls = {};
        eventTypes.forEach((eventTypePresent) => {
            controls[eventTypePresent.name] = [false];
        });
        return controls as FormGroup;
    }

    private eventTypesValidator(control: FormControl): { [key: string]: any } {
        const valid = Object.values(control.value).some((value: any) => value === true);
        return valid ? null : {eventType: 'need some event type checked'};
    }
}
