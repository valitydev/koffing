import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { CategoryService } from 'koffing/backend/backend.module';
import { ShopService } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { Shop } from 'koffing/backend/classes/shop.class';
import { Contract } from 'koffing/backend/classes/contract.class';
import { PayoutAccount } from 'koffing/backend/classes/payout-account.class';
import { ContractService } from 'koffing/backend/services/contract.service';

@Component({
    selector: 'kof-edit-shop',
    templateUrl: './edit-shop.component.pug',
})
export class EditShopComponent implements OnInit {

    public categories: SelectItem[] = [];
    public currentShopId: number = Number(this.route.snapshot.params['shopID']);
    public args: any = {
        shopDetails: {},
        categoryRef: 0,
        contractId: 0,
        payoutAccountId: 0,
        callbackHandlerUrl: ''
    };
    public shopContract: Contract;
    public shopPayoutAccount: PayoutAccount;
    public showContractDetails: boolean = false;
    public showPayoutAccountDetails: boolean = false;

    private isLoading: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService,
        private shopService: ShopService,
        private contractService: ContractService
    ) {}

    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public loadDetails(contractId: number, payoutAccountId: number): Promise<any> {
        return new Promise((resolve) => {
            this.contractService.getContract(contractId).then(
                (contract) => {
                    this.shopContract = contract;
                    this.shopPayoutAccount = _.find(contract.payoutAccounts,
                        (payoutAccount: PayoutAccount) => payoutAccount.id === payoutAccountId
                    );

                    resolve();
                }
            );
        });
    }
    
    public loadShops() {
        return new Promise((resolve) => {
            this.shopService.getShops().then((shops: any) => {
                const currentShop: Shop = _.find(shops, (shop: any) => shop.shopID === this.currentShopId);
                this.args.shopDetails = currentShop.shopDetails ? currentShop.shopDetails : {};
                this.args.categoryRef = currentShop.categoryRef;
                this.args.contractId = currentShop.contractID;
                this.args.payoutAccountId = currentShop.payoutAccountID;
                this.args.callbackHandlerUrl = currentShop.callbackHandler.url;

                this.loadDetails(currentShop.contractID, currentShop.payoutAccountID).then(() => {
                    resolve();
                });
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

            this.shopService.updateShop(this.currentShopId, this.args).then(() => {
                this.isLoading = false;

                this.returnToManagement();
            });
        }
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
