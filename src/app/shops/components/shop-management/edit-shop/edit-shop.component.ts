import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { ShopService } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { ShopArgs } from 'koffing/shops/shops.module';

@Component({
    selector: 'kof-edit-shop',
    templateUrl: './edit-shop.component.pug',
})
export class EditShopComponent implements OnInit {

    public categories: SelectItem[] = [];
    public currentShopId: string;
    public args: ShopArgs = {
        shopDetails: {},
        contractor: {},
        categoryRef: null
    };

    private isLoading: boolean;

    constructor(private categoryService: CategoryService,
                private shopService: ShopService,
                private router: Router,
                private route: ActivatedRoute) { }

    public loadShops() {
        return new Promise((resolve) => {
            this.shopService.getShops().then((shops: any) => {
                const found: any = _.find(shops, (shop: any) => shop.shopID === this.currentShopId);
                this.args.shopDetails = found.shopDetails ? found.shopDetails : {};
                this.args.contractor = found.contractor ? found.contractor : {};
                this.args.categoryRef = found.categoryRef;

                resolve();
            });
        });
    }

    public loadCategories() {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then(aCategories => {
                this.categories = _.map(aCategories, (cat: any) => new SelectItem(cat.categoryRef, cat.name));

                resolve();
            });
        });
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public updateShop(form: any) {
        if (form.valid) {
            this.isLoading = true;

            if (!this.args.contractor.hasOwnProperty('legalEntity')) {
                this.args.contractor.legalEntity = '';
            }

            this.shopService.updateShop(this.currentShopId, this.args).then(() => {
                this.isLoading = false;

                this.router.navigate(['/shops']);
            });
        }
    }

    public ngOnInit() {
        this.currentShopId = this.route.snapshot.params['shopID'];

        this.isLoading = true;
        Promise.all([
            this.loadShops(),
            this.loadCategories()
        ]).then(() => {
            this.isLoading = false;
        });
    }
}
