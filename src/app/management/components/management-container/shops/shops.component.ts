import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Category } from 'koffing/backend/backend.module';
import { CategoryService } from 'koffing/backend/backend.module';
import { ShopService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/classes/shop.class';

@Component({
    templateUrl: 'shops.component.pug',
    styleUrls: ['./shops.component.less']
})
export class ShopsComponent implements OnInit {

    public shops: Shop[] = [];
    public categories: Category[] = [];
    public isLoading: boolean;
    public panelsVisibilities: {[key: number]: boolean} = {};

    constructor(
        private shopService: ShopService,
        private categoryService: CategoryService
    ) {}

    public ngOnInit() {
        this.loadData();
    }

    public loadData() {
        this.isLoading = true;
        Promise.all([
            this.loadShops(),
            this.loadCategories()
        ]).then(() => {
            this.isLoading = false;
        });
    }

    public activateShop(shop: any) {
        this.isLoading = true;
        this.shopService.activateShop(shop.id).then(() => {
            this.loadShops().then(() => {
                this.isLoading = false;
            });
        });
    }

    public loadShops(): Promise<Shop[]> {
        this.panelsVisibilities = {};
        return new Promise((resolve) => {
            this.shopService.getShops().then(shops => {
                this.shops = shops;
                resolve();
            });
        });
    }

    public loadCategories(): Promise<Category[]> {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then(categories => {
                this.categories = categories;
                resolve();
            });
        });
    }

    public isDetailsPanelVisible(panelIndex: number): boolean {
        if (!this.panelsVisibilities.hasOwnProperty(panelIndex)) {
            this.panelsVisibilities[panelIndex] = false;
        }
        return this.panelsVisibilities[panelIndex];
    }

    public showDetailsPanel(panelIndex: number) {
        this.panelsVisibilities[panelIndex] = !this.panelsVisibilities[panelIndex];
    }

    public getCategoryName(categoryID: number): string {
        if (this.categories.length > 0) {
            return (_.find(this.categories, (category: Category) => category.categoryID === categoryID)).name;
        }
    }

    public isDetailsAvailable(shop: Shop): boolean {
        return !shop.isBlocked;
    }
}
