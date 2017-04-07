import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { ShopDetails } from 'koffing/backend/backend.module';
import { ShopLocationUrl } from 'koffing/backend/classes/shop-location-url.class';
import { Category } from 'koffing/backend/classes/category.class';
import { Shop } from 'koffing/backend/classes/shop.class';
import { ShopDetailTransfer } from './shop-detail-transfer.class';

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
    public shopDetail: ShopDetails;
    public categoryId: number;
    public callbackUrl: string;
    private errorsHighlighted: boolean = false;

    @Input()
    private defaultShop: Shop;

    constructor(
        private categoryService: CategoryService
    ) { }

    public ngOnInit() {
        this.isLoading = true;
        this.getCategories().then(() => {
            if (this.defaultShop) {
                this.categoryId = this.defaultShop.categoryID;
            }
            this.isLoading = false;
        });
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
        if (this.defaultShop.callbackHandler) {
            this.callbackUrl = this.defaultShop.callbackHandler.url;
        }
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

    public highlightErrors() {
        this.errorsHighlighted = true;
    }

    public hasError(field: any): boolean {
        return (this.errorsHighlighted || field.dirty) && field.invalid;
    }

    public keyup(form: any) {
        this.onChange.emit(new ShopDetailTransfer(this.shopDetail, _.toNumber(this.categoryId), this.callbackUrl, form.valid));
    }

    public setLocation(url: string, form: any) {
        this.shopDetail.location = new ShopLocationUrl(url);
        this.keyup(form);
    }

    public onCategoryChange(categoryId: string, form: any) {
        this.keyup(form);
    }
}
