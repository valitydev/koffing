import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimService } from 'koffing/backend/claim.service';
import { ShopService } from 'koffing/backend/shop.service';
import { Claim, Shop, CLAIM_STATUS } from 'koffing/backend';
import { BreadcrumbBroadcaster } from 'koffing/broadcaster';
import { ClaimModificationService } from './claim-modification.service';
import { Observable } from 'rxjs/Observable';
import { ManagementService } from './management.service';

@Component({
    templateUrl: 'management.component.pug'
})
export class ManagementComponent implements OnInit {

    public claims: Claim[];

    public shops: Shop[];

    public isCreating: boolean = false;

    constructor(private claimService: ClaimService,
                private router: Router,
                private shopService: ShopService,
                private claimModificationService: ClaimModificationService,
                private managementService: ManagementService,
                private breadcrumbBroadcaster: BreadcrumbBroadcaster) {
    }

    public ngOnInit() {
        Observable.zip(
            this.claimService.getClaims(CLAIM_STATUS.pending),
            this.shopService.getShops()
        ).subscribe((response) => {
            this.claims = response[0];
            this.shops = response[1];

            if (this.shops.length === 0) {
                this.createTestShop();
            }
        });
        this.breadcrumbBroadcaster.fire([]);
    }

    public getModificationType(claim: Claim) {
        return this.claimModificationService.getModificationType(claim.changeset);
    }

    public getShopName(claim: Claim) {
        const details = this.claimModificationService.getRelatedShopDetails(claim.changeset, this.shops);
        return details.name;

    }

    public createShop() {
        this.router.navigate(['/shop/create']);
    }

    public createTestShop() {
        this.isCreating = true;
        this.managementService.createTestShop().subscribe((shops) => {
            this.shops = shops;
            this.isCreating = false;
        });
    }

    public goToClaimDetails(claimID: number) {
        this.router.navigate(['/claim', claimID]);
    }

    public goToShop(shopID: string) {
        this.router.navigate([`/shop/${shopID}/invoices`]);
    }
}
