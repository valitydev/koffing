import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { ShopService } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { ShopArgs } from 'koffing/shops/shops.module';

@Component({
    selector: 'kof-add-shop',
    templateUrl: './add-shop.component.pug'
})

export class AddShopComponent implements OnInit {

    public categories: SelectItem[] = [];

    public args: ShopArgs = {
        shopDetails: {},
        contractor: {},
        categoryRef: null
    };

    private isLoading: boolean;

    constructor(private categoryService: CategoryService,
                private shopService: ShopService,
                private router: Router) { }

    public getCategories() {
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

    public createClaim(form: any) {
        if (form.valid) {
            this.args.contractor.legalEntity = '';
            this.isLoading = true;

            this.shopService.createShop(this.args).then(() => {
                this.isLoading = false;

                this.router.navigate(['/shops']);
            });
        }
    }

    public ngOnInit() {
        this.isLoading = true;
        this.getCategories().then(() => {
            this.isLoading = false;
        });
    }
}
