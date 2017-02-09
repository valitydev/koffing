import { Component, OnInit } from '@angular/core';

import { Claim } from 'koffing/backend/backend.module';
import { ClaimService } from 'koffing/backend/backend.module';
import { ClaimReceiveBroadcaster } from 'koffing/broadcaster/services/claim-receive.broadcaster.service';

@Component({
    selector: 'kof-claims',
    templateUrl: 'claims.component.pug'
})
export class ClaimsComponent implements OnInit {

    public claim: Claim;
    public changeset: any[];
    public showClaimInfo: boolean = false;
    public revokeReason: string;

    constructor(private claimService: ClaimService,
                private claimReceiveBroadcaster: ClaimReceiveBroadcaster) { }

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
        this.claimReceiveBroadcaster.on().subscribe(() => {
            this.getClaim();
        });
        this.getClaim();
    }

    private getClaim() {
        this.claimService.getClaim({status: 'pending'}).then((claims: Claim[]) => {
            if (claims.length > 0) {
                this.claim = claims[0];
                this.changeset = this.claim.changeset;
                this.showClaimInfo = true;
            }
        });
    }
}
