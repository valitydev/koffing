import { Component, Input, OnInit } from '@angular/core';

import { ContractModification, PartyModification, ShopModification } from 'koffing/backend';
import { ClaimDetailsService } from '../claim-details.service';
import { MODIFICATION_TYPE } from 'koffing/management/modification-type';

@Component({
    selector: 'kof-claim-modification-details',
    templateUrl: 'claim-modification-details.component.pug',
    providers: [ClaimDetailsService]
})
export class ClaimModificationDetailsComponent implements OnInit {
    @Input()
    public partyModification: PartyModification;

    private modificationType: string;
    private MODIFICATION_TYPE = MODIFICATION_TYPE;

    public ngOnInit() {
        switch (this.partyModification.partyModificationType) {
            case 'ContractModification':
                this.modificationType = (this
                    .partyModification as ContractModification).contractModificationType;
                break;
            case 'ShopModification':
                this.modificationType = (this
                    .partyModification as ShopModification).shopModificationType;
                break;
        }
    }
}
