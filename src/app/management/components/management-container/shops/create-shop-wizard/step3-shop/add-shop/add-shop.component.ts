import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { Shop } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-add-shop',
    templateUrl: 'add-shop.component.pug'
})

export class AddShopComponent implements OnInit {

    @Output()
    public readyStateChange = new EventEmitter();

    public categories: SelectItem[] = [];

    public isCategorySelected: boolean = false;
    private isOnceValid: boolean = false;
    private isLoading: boolean = false;
    private latestFormState: any;

    @Input()
    private shopFields: Shop;

    constructor(
        private categoryService: CategoryService
    ) { }

    public getCategories() {
        return new Promise((resolve) => {
            this.categoryService.getCategories().then(aCategories => {
                this.categories = _.map(aCategories, (cat: any) => new SelectItem(cat.categoryRef, cat.name));

                resolve();
            });
        });
    }

    public selectCategory() {
        this.isCategorySelected = true;
        this.checkForm(this.latestFormState);
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    public checkForm(form: any) {
        this.latestFormState = form;

        if (!this.isCategorySelected) {
            return;
        }

        let emit = () => {
            this.readyStateChange.emit({
                shopFields: this.shopFields,
                valid: form.valid
            });
        };

        if (form.valid) {
            emit();
            this.isOnceValid = true;
        } else if (!form.valid && this.isOnceValid) {
            emit();
            this.isOnceValid = false;
        }
    }

    public ngOnInit() {
        this.isLoading = true;
        this.getCategories().then(() => {
            this.isLoading = false;
        });
    }
}
