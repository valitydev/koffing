import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BreadcrumbBroadcaster } from 'koffing/broadcaster';
import { ClaimService } from 'koffing/backend/claim.service';
import { Claim } from 'koffing/backend';
import { ClaimDetailsService } from './claim-details.service';
import { ModificationType } from '../modification-type';
import { ClaimModificationService } from '../claim-modification.service';

@Component({
    templateUrl: 'claim-details.component.pug',
    providers: [ClaimDetailsService]
})
export class ClaimDetailsComponent implements OnInit {

    public claim: Claim;
    public modificationType: ModificationType;
    public ModificationType = ModificationType;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private claimService: ClaimService,
        private breadcrumbBroadcaster: BreadcrumbBroadcaster,
        private claimModificationService: ClaimModificationService
    ) { }

    public ngOnInit() {
        const claimID = this.route.snapshot.params['claimID'];
        this.claimService.getClaimByID(claimID).subscribe((claim) => {
            this.claim = claim;
            this.modificationType = this.claimModificationService.getModificationType(claim.changeset);
        });
        this.breadcrumbBroadcaster.fire([{label: 'Детали заявки'}]);
    }

    public back() {
        this.router.navigate(['/']);
    }
}
