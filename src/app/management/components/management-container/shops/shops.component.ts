import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Category } from 'koffing/backend/backend.module';
import { CategoryService } from 'koffing/backend/backend.module';
import { ShopService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/classes/shop.class';
import { ClaimService } from 'koffing/backend/services/claim.service';
import { ClaimRevokeBroadcaster } from 'koffing/broadcaster/services/claim-revoke-broadcaster.service';
import { Claim } from 'koffing/backend/classes/claim/claim.class';

@Component({
    templateUrl: 'shops.component.pug',
    styleUrls: ['./shops.component.less']
})
export class ShopsComponent implements OnInit {

    public shops: Shop[] = [];
    public categories: Category[] = [];
    public isLoading: boolean;
    public panelsVisibilities: {[key: number]: boolean} = {};
    public claimFound: boolean = false;

    constructor(
        private shopService: ShopService,
        private categoryService: CategoryService,
        private claimService: ClaimService,
        private claimRevokeBroadcaster: ClaimRevokeBroadcaster
    ) {}

    public ngOnInit() {
        this.loadData();
        this.claimRevokeBroadcaster.on().subscribe(() => {
            this.isLoading = true;
            this.checkClaim().then(() => {
                this.isLoading = false;
            });
        });
    }

    public loadData() {
        this.isLoading = true;
        Promise.all([
            this.loadShops(),
            this.loadCategories(),
            this.checkClaim()
        ]).then(() => {
            this.isLoading = false;
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

    private checkClaim(): Promise<Claim[]> {
        return new Promise((resolve) => {
            this.claimService.getClaim({status: 'pending'}).then((claims: Claim[]) => {
                this.claimFound = claims.length > 0;
                resolve();
            });
        });
    }
}
