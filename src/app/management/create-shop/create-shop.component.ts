import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

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
    public type: string;
    public msgs: Message[] = [];
    private changeSet: PartyModification[];

    constructor(
        private claimService: ClaimService,
        private createShopService: CreateShopService,
        private router: Router,
        private breadcrumbBroadcaster: BreadcrumbBroadcaster
    ) {
    }

    public ngOnInit() {
        this.type = this.createShopService.type;
        this.createShopService.changeSetEmitter.subscribe((changeSet: PartyModification[]) => {
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
        const possibility = this.createShopService.getNextPossibility(this.currentStep);
        if (possibility === true) {
            this.currentStep = this.currentStep + 1;
            this.validStep = this.isValid();
            this.msgs = [];
        } else {
            this.msgs = [{severity: 'warn', summary: possibility.summary, detail: possibility.detail}];
        }
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
