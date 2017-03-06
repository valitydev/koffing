import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { ShopDetail } from 'koffing/backend/classes/shop-detail.class';
import { ShopLocationUrl } from 'koffing/backend/classes/shop-location-url.class';
import { ShopDetailTransfer } from './shop-detail-transfer.class';
import { Category } from 'koffing/backend/classes/category.class';

@Component({
    selector: 'kof-add-shop',
    templateUrl: 'add-shop.component.pug'
})

export class AddShopComponent implements OnInit {

    @Output()
    public onChange = new EventEmitter();

    public categories: SelectItem[] = [];
    public isLoading: boolean = false;
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
            this.categoryService.getCategories().then((categories: Category[]) => {
                this.categories = _.chain(categories)
                    .sortBy((category) => category.name)
                    .map((category) => new SelectItem(category.categoryID, category.name))
                    .value();
                this.categoryId = this.categories[0].value;
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
}
