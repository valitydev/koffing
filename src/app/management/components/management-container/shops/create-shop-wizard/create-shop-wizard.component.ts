import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { ContractService } from 'koffing/backend/services/contract.service';
import { WizardArgs } from 'koffing/management/management.module';
import { ShopService } from 'koffing/backend/services/shop.service';

@Component({
    templateUrl: './create-shop-wizard.component.pug'
})
export class CreateShopWizardComponent implements OnInit {

    public currentStep: number;
    public contractStep: number = 1;
    public accountStep: number = 2;
    public shopDetailsStep: number = 3;
    public wizardArgs: WizardArgs = new WizardArgs();

    constructor(
        private router: Router,
        private contractService: ContractService,
        private shopService: ShopService
    ) { }    
    
    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public goToStep(step: number) {
        this.currentStep = step;
    }

    public finishWizard() {
        this.createShop().then(() => {
            this.returnToManagement();
        });
    }

    public ngOnInit() {
        this.wizardArgs.isLoading = false;
        this.loadContracts();
        this.goToStep(this.contractStep);
    }

    private loadContracts() {
        this.wizardArgs.isLoading = true;
        this.contractService.getContracts().then((contracts) => {
            this.wizardArgs.contracts = contracts;
            this.wizardArgs.isLoading = false;
        });
    }

    private createShop(): Promise<any> {
        this.wizardArgs.isLoading = true;

        return new Promise((resolve) => {
            this.shopService.createShop(_.merge(
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
