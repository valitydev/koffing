import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContractDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/contract-decision.class';
import { PaytoolDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/paytool-decision.class';

@Component({
    templateUrl: 'create-shop-wizard.component.pug'
})
export class CreateShopWizardComponent implements OnInit {

    public currentStep: number;
    public contractStep: number = 1;
    public paytoolStep: number = 2;
    public shopDetailsStep: number = 3;

    public contractDecision: ContractDecision;
    public payoutToolDecision: PaytoolDecision;

    constructor(private router: Router) { }

    public ngOnInit() {
        this.currentStep = this.contractStep;
    }
    
    public returnToManagement() {
        this.router.navigate(['/management']);
    }

    public goToPaytoolStep(contractDecision: ContractDecision) {
        this.currentStep = this.paytoolStep;
        this.contractDecision = contractDecision;
    }

    public goToShopDetailsStep(payoutToolDecision: PaytoolDecision) {
        this.payoutToolDecision = payoutToolDecision;
        this.currentStep = this.shopDetailsStep;
    }

    public finishWizard() {
        this.returnToManagement();
    }
}
