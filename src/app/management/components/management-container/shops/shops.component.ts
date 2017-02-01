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

    private isLoading: boolean;
    private panelsVisibilities: {[key: number]: boolean} = {};

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

    public handleShopSuspended() {
        this.isLoading = true;

        this.loadShops().then(() => {
            this.isLoading = false;
        });
    }

    public loadShops() {
        this.resetPanelsVisibilities();

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

    public isDetailsPanelVisible(panelIndex: number) {
        if (!this.panelsVisibilities.hasOwnProperty(panelIndex)) {
            this.initPanelVisibility(panelIndex);
        }
        return this.panelsVisibilities[panelIndex];
    }

    public showDetailsPanel(panelIndex: number) {
        this.panelsVisibilities[panelIndex] = !this.panelsVisibilities[panelIndex];
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

    private initPanelVisibility(panelIndex: number) {
        this.panelsVisibilities[panelIndex] = false;
    }

    private resetPanelsVisibilities() {
        this.panelsVisibilities = {};
    }
}
