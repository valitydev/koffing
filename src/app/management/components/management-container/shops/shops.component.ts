import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Category } from 'koffing/backend/backend.module';
import { CategoryService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/backend.module';
import { ShopService } from 'koffing/backend/backend.module';

@Component({
    templateUrl: 'shops.component.pug'
})
export class ShopsComponent implements OnInit {

    public shops: Shop[] = [];
    public categories: Category[] = [];

    private isLoading: boolean;

    constructor(
        private shopService: ShopService,
        private categoryService: CategoryService
    ) {}

    public activateShop(shop: any) {
        this.isLoading = true;

        this.shopService.activateShop(shop.shopID).then(() => {
            this.loadShops().then(() => {
                this.isLoading = false;
            });
        });
    }

    public loadShops() {
        return new Promise((resolve) => {
            this.shopService.getShops().then(aShops => {
                this.shops = aShops;

                resolve();
            });
        });
    }

    public loadCategories() {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then(aCategories => {
                this.categories = aCategories;

                resolve();
            });
        });
    }

    public getCategory(categoryRef: number): Category {
        let result = new Category();
        if (this.categories.length > 0) {
            result = _.find(this.categories, (category: Category) => category.categoryRef === categoryRef);
        }
        return result;
    }

    public ngOnInit() {
        this.isLoading = true;
        Promise.all([
            this.loadShops(),
            this.loadCategories()
        ]).then(() => {
            this.isLoading = false;
        });
    }
}
