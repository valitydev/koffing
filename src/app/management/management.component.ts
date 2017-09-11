import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimService } from 'koffing/backend/claim.service';
import { ShopService } from 'koffing/backend/shop.service';
import { Claim, Shop } from 'koffing/backend';
import { BreadcrumbBroadcaster } from 'koffing/broadcaster';

@Component({
    templateUrl: 'management.component.pug'
})
export class ManagementComponent implements OnInit {

    public claims: Claim[];

    public shops: Shop[];

    constructor(private claimService: ClaimService,
                private router: Router,
                private shopService: ShopService,
                private breadcrumbBroadcaster: BreadcrumbBroadcaster) {
    }

    public ngOnInit() {
        this.claimService.getClaims('pending').subscribe((claims: Claim[]) => {
            this.claims = claims;
        });
        this.shopService.getShops().subscribe((shops: Shop[]) => {
            this.shops = shops;
        });
        this.breadcrumbBroadcaster.fire([]);
    }

    public createShop() {
        this.router.navigate(['/shop/create']);
    }

    public goToClaimDetails(claimID: number) {
        this.router.navigate(['/claim', claimID]);
    }

    public goToShop(shopID: string) {
        this.router.navigate([`/shop/${shopID}/invoices`]);
    }
}
