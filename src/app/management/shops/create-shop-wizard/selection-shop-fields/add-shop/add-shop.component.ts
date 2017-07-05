import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';

import { ShopDetails } from 'koffing/backend/model/shop-details';
import { ShopLocationUrl } from 'koffing/backend/model/shop-location-url';
import { Shop } from 'koffing/backend/model/shop';
import { ShopDetailTransfer } from './shop-detail-transfer';

@Component({
    selector: 'kof-add-shop',
    templateUrl: 'add-shop.component.pug'
})

export class AddShopComponent implements OnInit {

    @Output()
    public onChange = new EventEmitter();
    public url: string;
    public shopDetail: ShopDetails;
    private errorsHighlighted: boolean = false;

    @Input()
    private defaultShop: Shop;

    public ngOnInit() {
        this.shopDetail = new ShopDetails();
        if (this.defaultShop) {
            this.assignDefault();
        }
    }

    public assignDefault() {
        _.assign(this.shopDetail, this.defaultShop.details);
        if (this.defaultShop.details.location) {
            this.url = (<ShopLocationUrl> this.defaultShop.details.location).url;
        }
    }

    public highlightErrors() {
        this.errorsHighlighted = true;
    }

    public hasError(field: any): boolean {
        return (this.errorsHighlighted || field.dirty) && field.invalid;
    }

    public keyup(form: any) {
        this.onChange.emit(new ShopDetailTransfer(this.shopDetail, form.valid));
    }

    public setLocation(url: string, form: any) {
        this.shopDetail.location = new ShopLocationUrl(url);
        this.keyup(form);
    }
}
