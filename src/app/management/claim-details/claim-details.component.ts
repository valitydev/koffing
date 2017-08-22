import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaimService } from 'koffing/backend/claim.service';
import { ClaimDetailsService } from './claim-details.service';
import {
    Claim,
    ContractCreation,
    ContractPayoutToolCreation,
    ShopCreation
} from 'koffing/backend';
import { BreadcrumbBroadcaster } from 'koffing/broadcaster/services/breadcrumb.broadcaster';

@Component({
    templateUrl: 'claim-details.component.pug',
    providers: [ClaimDetailsService]
})
export class ClaimDetailsComponent implements OnInit {

    public claim: Claim;

    public contractCreations: ContractCreation[];

    public contractPayoutToolCreations: ContractPayoutToolCreation[];

    public shopCreations: ShopCreation[];

    constructor(private claimService: ClaimService,
                private route: ActivatedRoute,
                private claimDetailsService: ClaimDetailsService,
                private breadcrumbBroadcaster: BreadcrumbBroadcaster) {
    }

    public ngOnInit() {
        const claimID = this.route.snapshot.params['claimID'];
        this.claimService.getClaimByID(claimID).subscribe((claim) => {
            this.claim = claim;
            this.contractCreations = this.claimDetailsService.toContractCreations(claim.changeset);
            this.contractPayoutToolCreations = this.claimDetailsService.toContractPayoutToolCreations(claim.changeset);
            this.shopCreations = this.claimDetailsService.toShopCreation(claim.changeset);
        });
        this.breadcrumbBroadcaster.fire([{label: 'Детали заявки'}]);
    }
}
