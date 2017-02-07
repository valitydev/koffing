import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { ShopDetail } from 'koffing/backend/classes/shop-detail.class';
import { ShopLocationUrl } from 'koffing/backend/classes/shop-location-url.class';

@Component({
    selector: 'kof-add-shop',
    templateUrl: 'add-shop.component.pug'
})

export class AddShopComponent implements OnInit {

    @Output()
    public onShopReady = new EventEmitter();

    public categories: SelectItem[] = [];

    public isCategorySelected: boolean = false;
    public isLoading: boolean = false;
    public latestFormState: any;

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
        this.shopDetail = this.getInstance();
    }

    public getCategories() {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then(categories => {
                this.categories = _.map(categories, (category: any) => new SelectItem(category.categoryID, category.name));
                resolve();
            });
        });
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public checkForm(form: any) {
        if (form.valid) {
            this.onShopReady.emit({
                shopDetail: this.shopDetail,
                categoryId: _.toNumber(this.categoryId),
                callbackUrl: this.callbackUrl
            });
        }
    }

    private getInstance(): ShopDetail {
        const instance = new ShopDetail();
        instance.location = new ShopLocationUrl();
        return instance;
    }
}
