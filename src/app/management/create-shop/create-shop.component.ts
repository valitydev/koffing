import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CreateShopService } from './create-shop.service';
import { ShopCreationStep } from './shop-creation-step';
import { ClaimService } from 'koffing/backend/claim.service';
import { PartyModification } from 'koffing/backend/model';
import { FormResolver } from './form-resolver.service';
import { BankAccount } from 'koffing/backend/model/bank-account';
import { BreadcrumbBroadcaster } from 'koffing/broadcaster/services/breadcrumb.broadcaster';

@Component({
    templateUrl: 'create-shop.component.pug',
    providers: [
        CreateShopService,
        FormResolver
    ],
    styleUrls: ['create-shop.component.less']
})
export class CreateShopComponent implements OnInit {

    public validStep = false;
    public step = ShopCreationStep;
    public currentStep = ShopCreationStep.contract;
    public contractGroup = this.createShopService.contractGroup;
    public payoutToolGroup = this.createShopService.payoutToolGroup;
    public shopGroup = this.createShopService.shopGroup;
    public contractBankAccount: BankAccount;
    private changeset: PartyModification[];

    constructor(private claimService: ClaimService,
                private createShopService: CreateShopService,
                private router: Router,
                private breadcrumbBroadcaster: BreadcrumbBroadcaster) {
    }

    public ngOnInit() {
        this.createShopService.changesetEmitter.subscribe((changeset) => {
            if (changeset) {
                this.validStep = true;
                this.changeset = changeset;
                this.contractBankAccount = this.createShopService.getContractBankAccount();
            } else {
                this.validStep = false;
            }
        });
        this.breadcrumbBroadcaster.fire([{label: 'Создание магазина'}]);
    }

    public next() {
        this.currentStep = this.currentStep + 1;
        this.validStep = this.isValid();
    }

    public prev() {
        this.currentStep = this.currentStep - 1;
        this.validStep = this.isValid();
    }

    public createClaim() {
        this.claimService.createClaim(this.changeset).subscribe(() =>
            this.router.navigate(['/']));
    }

    private isValid(): boolean {
        return !!this.changeset[this.currentStep];
    }

}
