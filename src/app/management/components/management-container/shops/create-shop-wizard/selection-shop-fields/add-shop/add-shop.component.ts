import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { ShopDetail } from 'koffing/backend/classes/shop-detail.class';
import { ShopLocationUrl } from 'koffing/backend/classes/shop-location-url.class';
import { ShopDetailTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-shop-fields/add-shop/shop-detail-transfer.class';
import { ShopLocation } from 'koffing/backend/classes/shop-location.class';

@Component({
    selector: 'kof-add-shop',
    templateUrl: 'add-shop.component.pug'
})

export class AddShopComponent implements OnInit {

    @Output()
    public onChange = new EventEmitter();

    public categories: SelectItem[] = [];

    public isCategorySelected: boolean = false;
    public isLoading: boolean = false;
    public latestFormState: any;
    public url: string;

    public shopDetail: ShopDetail;
    public categoryId: number;
    public callbackUrl: string;

    constructor(
        private categoryService: CategoryService
    ) { }

    public ngOnInit() {
        this.isLoading = true;
        this.getCategories().then(() => {
            this.isLoading = false;
        });
        this.shopDetail = new ShopDetail();
    }

    public getCategories() {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then(categories => {
                this.categories = _.map(categories, (category: any) => new SelectItem(category.categoryID, category.name));
                this.categoryId = categories[0].categoryID;
                resolve();
            });
        });
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public keyup(form: any) {
        this.onChange.emit(new ShopDetailTransfer(this.shopDetail, _.toNumber(this.categoryId), this.callbackUrl, form.valid));
    }

    public setLocation(url: string, form: any) {
        this.shopDetail.location = new ShopLocationUrl(url);
        this.keyup(form);
    }

    private getInstance(): ShopDetail {
        const instance = new ShopDetail();
        instance.location = new ShopLocation();
        return instance;
    }
}
