import { Component, Input } from '@angular/core';
import { ClaimService } from 'koffing/backend/claim.service';
import { Router } from '@angular/router';
import { Claim } from 'koffing/backend';

@Component({
    selector: 'kof-revoke-claim',
    templateUrl: 'revoke-claim.component.pug'
})
export class RevokeClaimComponent {
    @Input()
    public claim: Claim;

    public reason: string;

    constructor(private claimService: ClaimService, private router: Router) {}

    public revokeClaim(reason: string) {
        this.claimService
            .revokeClaimByID(this.claim.id, this.claim.revision, reason)
            .subscribe(() => this.router.navigate(['/']));
    }
}
