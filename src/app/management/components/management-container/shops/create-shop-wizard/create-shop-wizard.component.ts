import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContractDecision } from './selection-contract/contract-decision.class';
import { PaytoolDecision } from './selection-paytool/paytool-decision.class';

@Component({
    templateUrl: 'create-shop-wizard.component.pug',
    styleUrls: [` 
        .wizard_steps {
            padding-left: 0;
        }
        .wizard_horizontal ul.wizard_steps li {
            width: 33%;
            display: table-cell!important;
        }
    `]
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
