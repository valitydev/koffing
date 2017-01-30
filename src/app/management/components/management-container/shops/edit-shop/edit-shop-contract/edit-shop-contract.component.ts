import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { ShopService } from 'koffing/backend/backend.module';
import { ContractService } from 'koffing/backend/services/contract.service';
import { ShopModificationArgs } from 'koffing/management/classes/shop-modification-args.class';
import { Shop } from 'koffing/backend/classes/shop.class';

@Component({
    selector: 'kof-edit-shop-contract',
    templateUrl: 'edit-shop-contract.component.pug',
    styleUrls: ['edit-shop-contract.component.less']
})
export class EditShopContractComponent implements OnInit {

    public currentStep: number;
    public contractStep: number = 1;
    public accountStep: number = 2;
    public currentShopId: number = Number(this.route.snapshot.params['shopID']);
    public wizardArgs: ShopModificationArgs = new ShopModificationArgs();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shopService: ShopService,
        private contractService: ContractService
    ) {}

    public returnToShopEditing() {
        this.router.navigate([`/shops/edit/${this.currentShopId}`]);
    }

    public goToStep(step: number) {
        this.currentStep = step;
    }

    public ngOnInit() {
        this.wizardArgs.isLoading = true;

        Promise.all([
            this.loadContracts(),
            this.loadShops()
        ]).then(() => {
            this.wizardArgs.isLoading = false;

            this.goToStep(this.contractStep);
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
                this.wizardArgs.shopFields = currentShop;

                resolve();
            });
        });
    }    
    
    private loadContracts() {
        return new Promise((resolve) => {
            this.contractService.getContracts().then((contracts) => {
                this.wizardArgs.contracts = contracts;

                resolve();
            });
        });
    }

    private updateShop(): Promise<any> {
        this.wizardArgs.isLoading = true;

        return new Promise((resolve) => {
            this.shopService.updateShop(this.currentShopId, _.merge(
                this.wizardArgs.shopFields,
                { contractID: this.wizardArgs.contract.id },
                { payoutAccountID: this.wizardArgs.payoutAccount.id }
            )).then(() => {
                this.wizardArgs.isLoading = false;

                resolve();
            });
        });
    }
}
