import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';

import { ShopParams } from 'koffing/backend/classes/shop-params.class';
import { ShopService } from 'koffing/backend/services/shop.service';
import { PaytoolDecision } from '../selection-paytool/paytool-decision.class';
import { ShopDetailTransfer } from './add-shop/shop-detail-transfer.class';
import { AddShopComponent } from './add-shop/add-shop.component';

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
    public onCreated = new EventEmitter();
    private createShopArgs: ShopParams;
    @ViewChild('addShopRef')
    private addShopComponent: AddShopComponent;

    constructor(private shopService: ShopService) { }

    public onShopFieldsChange(value: ShopDetailTransfer) {
        this.isShopFieldsReady = value.valid;
        this.createShopArgs = new ShopParams();
        this.createShopArgs.contractID = this.payoutToolDecision.contractID;
        this.createShopArgs.payoutToolID = this.payoutToolDecision.payoutToolID;
        this.createShopArgs.categoryID = value.categoryID;
        this.createShopArgs.callbackUrl = value.callbackUrl;
        this.createShopArgs.details = value.shopDetail;
    }

    public createShop() {
        if (this.isShopFieldsReady) {
            this.isLoading = true;
            this.shopService.createShop(this.createShopArgs).then(() => {
                this.isLoading = false;
                this.onCreated.emit();
            });
        } else {
            this.addShopComponent.highlightErrors();
        }
    }
}
