import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShopService } from 'koffing/backend/shop.service';
import { WebhooksService } from 'koffing/backend/webhooks.service';
import { WebhookParams } from 'koffing/backend/requests/webhook-params';
import { SelectItem } from 'koffing/common/select/select-item';

@Component({
    selector: 'kof-webhook-item',
    templateUrl: './webhooks-item.component.pug',
})
export class WebhooksItemComponent implements OnInit  {

    public valid: boolean = false;

    public shops: SelectItem[];

    public model: WebhookParams = {
        url: undefined,
        scope: {
            topic: 'InvoicesTopic',
            shopID: undefined,
            eventTypes: undefined
        }
    };

    public eventTypes = [
        { name: 'InvoiceCreated', value: false, description: 'создан новый инвойс' },
        { name: 'InvoicePaid', value: false, description: 'инвойс перешел в состояние "Оплачен"' },
        { name: 'InvoiceCancelled', value: false, description: 'инвойс отменен по истечению срока давности' },
        { name: 'InvoiceFulfilled', value: false, description: 'инвойс успешно погашен' },
        { name: 'PaymentStarted', value: false, description: 'создан платеж' },
        { name: 'PaymentCaptured', value: false, description: 'платеж успешно завершен' },
        { name: 'PaymentFailed', value: false, description: 'при проведении платежа возникла ошибка' }
    ];

    constructor(private webhooksService: WebhooksService,
                private router: Router,
                private shopService: ShopService) {}

    public onChangeShop(value: any) {
        this.model.scope.shopID = parseInt(value, 10);
    }

    public onChangeEventTypes() {
        this.model.scope.eventTypes = [];
        this.model.scope.eventTypes = this.eventTypes.filter((item) => {
            if (item.value) {
                return item;
            }
        })
        .map((type) => type.name);
        this.validateForm();
    }

    public goBack() {
        this.router.navigate(['/webhooks']);
    }

    public createWebhook() {
        this.webhooksService.createWebhook(this.model).subscribe(() => {
            this.router.navigate(['/webhooks']);
        });
    }

    public validateForm() {
        const model = this.model;
        this.valid = !!(model.url && model.scope.shopID && model.scope.topic && model.scope.eventTypes && model.scope.eventTypes.length > 0);
    }

    public ngOnInit() {
        this.shopService.getShops()
            .then((shops) => {
                this.model.scope.shopID = shops[0].id;
                this.shops = shops.map((shop) => {
                    return {
                        label: shop.details.name,
                        value: shop.id
                    };
                });
            });
    }
}
