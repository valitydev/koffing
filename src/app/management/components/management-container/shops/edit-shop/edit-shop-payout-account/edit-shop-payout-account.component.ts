import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { ShopService } from 'koffing/backend/backend.module';
import { ContractService } from 'koffing/backend/services/contract.service';
import { ShopModificationArgs } from 'koffing/management/classes/shop-modification-args.class';
import { Shop } from 'koffing/backend/classes/shop.class';

@Component({
    selector: 'kof-edit-shop-payout-account',
    templateUrl: 'edit-shop-payout-account.component.pug'
})
export class EditShopPayoutAccountComponent implements OnInit {

    public currentShopId: number = Number(this.route.snapshot.params['shopID']);
    public currentContractId: number = Number(this.route.snapshot.params['contractID']);
    public args: ShopModificationArgs = new ShopModificationArgs();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shopService: ShopService,
        private contractService: ContractService
    ) {}

    public returnToShopEditing() {
        this.router.navigate([`/shops/edit/${this.currentShopId}`]);
    }

    public ngOnInit() {
        this.args.isLoading = true;

        Promise.all([
            this.loadShops(),
            this.loadContract()
        ]).then(() => {
            this.args.isLoading = false;
        });
    }

    public finish() {
        this.updateShop().then(() => {
            this.returnToShopEditing();
        });
    }

    public loadShops() {
        return new Promise((resolve) => {
            this.shopService.getShops().then((shops: any) => {
                const currentShop: Shop = _.find(shops, (shop: any) => shop.shopID === this.currentShopId);
                this.args.shopFields = currentShop;

                resolve();
            });
        });
    }
    
    public loadContract() {
        return new Promise((resolve) => {
            this.contractService.getContract(this.currentContractId).then(
                (contract) => {
                    this.args.contract = contract;
    
                    resolve();
            });
        });
    }

    private updateShop(): Promise<any> {
        this.args.isLoading = true;

        return new Promise((resolve) => {
            this.shopService.updateShop(this.currentShopId, _.merge(
                this.args.shopFields,
                { contractID: this.currentContractId },
                { payoutAccountID: this.args.payoutAccount.id }
            )).then(() => {
                this.args.isLoading = false;

                resolve();
            });
        });
    }
}
