import { Component, Output, EventEmitter, Input } from '@angular/core';

import { CreateShopArgs } from 'koffing/backend/classes/create-shop-args.class';
import { PaytoolDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/paytool-decision.class';
import { ShopService } from 'koffing/backend/services/shop.service';
import { ShopDetailTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-shop-fields/add-shop/shop-detail-transfer.class';

@Component({
    selector: 'kof-selection-shop-fields',
    templateUrl: 'selection-shop-fields.component.pug'
})
export class SelectionShopComponent {

    public isShopFieldsReady: boolean = false;

    public isLoading = false;

    @Input()
    public payoutToolDecision: PaytoolDecision;

    @Output()
    public steppedBackward = new EventEmitter();

    @Output()
    public onCreated = new EventEmitter();

    private createShopArgs: CreateShopArgs;

    constructor(private shopService: ShopService) { }

    public onShopFieldsChange(value: ShopDetailTransfer) {
        this.isShopFieldsReady = value.valid;
        this.createShopArgs = new CreateShopArgs();
        this.createShopArgs.contractID = this.payoutToolDecision.contractID;
        this.createShopArgs.payoutToolID = this.payoutToolDecision.payoutToolID;
        this.createShopArgs.categoryID = value.categoryID;
        this.createShopArgs.callbackUrl = value.callbackUrl;
        this.createShopArgs.details = value.shopDetail;
    }

    public createShop() {
        this.isLoading = true;
        if (this.isShopFieldsReady) {
            this.shopService.createShop(this.createShopArgs).then(() => {
                this.isLoading = false;
                this.onCreated.emit();
            });
        }
    }

    public stepBackward() {
        this.steppedBackward.emit();
    }
}
