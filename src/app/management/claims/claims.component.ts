import { Component, OnInit } from '@angular/core';

import { ClaimReceiveBroadcaster } from 'koffing/broadcaster/services/claim-receive.broadcaster.service';
import { ClaimRevokeBroadcaster } from 'koffing/broadcaster/services/claim-revoke-broadcaster.service';
import { Claim } from '../shared/claim';
import { ClaimService } from '../shared/claim.service';

@Component({
    selector: 'kof-claims',
    templateUrl: 'claims.component.pug'
})
export class ClaimsComponent implements OnInit {

    public claim: Claim;
    public changeset: any[];
    public showClaimInfo: boolean = false;
    public revokeReason: string;

    constructor(
        private claimService: ClaimService,
        private claimReceiveBroadcaster: ClaimReceiveBroadcaster,
        private claimRevokeBroadcaster: ClaimRevokeBroadcaster
    ) { }

    public revoke(reasonControl: any) {
        if (!reasonControl.valid) {
            return;
        }

        const revokeDetails = {
            reason: this.revokeReason
        };

        this.claimService.revokeClaim(this.claim.id, revokeDetails).then(() => {
            this.showClaimInfo = false;
            this.claimRevokeBroadcaster.fire();
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
