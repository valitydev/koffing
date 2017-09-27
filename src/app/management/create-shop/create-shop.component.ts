import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimService } from 'koffing/backend/claim.service';
import { PartyModification } from 'koffing/backend';
import { BreadcrumbBroadcaster } from 'koffing/broadcaster';
import { CreateShopService } from './create-shop.service';
import { ShopCreationStep } from './shop-creation-step';

@Component({
    templateUrl: 'create-shop.component.pug',
    styleUrls: ['create-shop.component.less'],
    providers: [CreateShopService]
})
export class CreateShopComponent implements OnInit {

    public validStep = false;
    public step = ShopCreationStep;
    public currentStep = ShopCreationStep.contract;
    public contractForm = this.createShopService.contractForm;
    public payoutToolForm = this.createShopService.payoutToolForm;
    public shopForm = this.createShopService.shopForm;
    private changeSet: PartyModification[];

    constructor(
        private claimService: ClaimService,
        private createShopService: CreateShopService,
        private router: Router,
        private breadcrumbBroadcaster: BreadcrumbBroadcaster
    ) { }

    public ngOnInit() {
        this.createShopService.changeSetEmitter.subscribe((changeSet) => {
            if (changeSet) {
                this.validStep = true;
                this.changeSet = changeSet;
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
        this.claimService.createClaim(this.changeSet).subscribe(() =>
            this.router.navigate(['/']));
    }

    private isValid(): boolean {
        return Boolean(this.changeSet[this.currentStep]);
    }

}
