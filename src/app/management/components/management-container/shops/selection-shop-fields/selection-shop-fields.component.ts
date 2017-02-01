import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

import { ShopModificationArgs } from 'koffing/management/management.module';
import { Shop } from 'koffing/backend/backend.module';
import { ShopDetail } from 'koffing/backend/backend.module';
import { CallbackHandler } from 'koffing/backend/classes/callback-handler';

@Component({
    selector: 'kof-selection-shop-fields',
    templateUrl: 'selection-shop-fields.component.pug'
})
export class SelectionShopComponent implements OnInit {

    @Input()
    public showFinishButton: boolean = false;
    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();
    public isShopFieldsReady: boolean = false;

    @Input()
    private args: ShopModificationArgs;

    public createNewShopFieldsInstance() {
        this.args.shopFields = new Shop();
        this.args.shopFields.shopDetails = new ShopDetail();
        this.args.shopFields.callbackHandler = new CallbackHandler();
        this.args.shopFields.categoryRef = null;
    }

    public removeShopFieldsInstance() {
        delete this.args.shopFields;
        this.isShopFieldsReady = false;
    }

    public ngOnInit() {
        this.removeShopFieldsInstance();
        this.createNewShopFieldsInstance();
    }

    public shopFieldsReady(params: any) {
        this.isShopFieldsReady = params.valid;
    }

    public stepForward() {
        this.steppedForward.emit();
    }

    public stepBackward() {
        this.steppedBackward.emit();
    }
}
