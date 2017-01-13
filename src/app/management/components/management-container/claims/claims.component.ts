import { Component, OnInit } from '@angular/core';

import { Claim } from 'koffing/backend/backend.module';
import { ClaimService } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-claims',
    templateUrl: 'claims.component.pug'
})
export class ClaimsComponent implements OnInit {

    public claim: Claim;
    public changeset: any[];
    public showClaimInfo: boolean = false;
    public revokeReason: string;

    private currentClaimStatus: string;

    constructor(private claimService: ClaimService) { }

    public revoke(reasonControl: any) {
        if (!reasonControl.valid) {
            return;
        }

        let revokeDetails = {
            reason: this.revokeReason
        };

        this.claimService.revokeClaim(this.claim.id, revokeDetails).then(() => {
            this.showClaimInfo = false;
        });
    }

    public ngOnInit() {
        this.currentClaimStatus = 'pending';

        this.getClaim();
    }

    private getClaim() {
        this.claimService.getClaim({status: this.currentClaimStatus}).then((aClaim: Claim) => {
                this.claim = aClaim;
                this.changeset = aClaim.changeset;
                this.showClaimInfo = true;
            }
        );
    }
}
