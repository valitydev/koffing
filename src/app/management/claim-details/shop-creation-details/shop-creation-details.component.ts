import { Component, Input, OnChanges } from '@angular/core';
import { last } from 'lodash';

import {
    BankAccount, Contractor, PartyModification, PayoutTool, PayoutToolDetailsBankAccount,
    ShopCreation
} from 'koffing/backend';
import { ClaimDetailsService } from '../claim-details.service';

@Component({
    selector: 'kof-shop-creation-details',
    templateUrl: 'shop-creation-details.component.pug'
})
export class ShopCreationDetailsComponent implements OnChanges {

    @Input()
    public partyModifications: PartyModification[];

    public shopCreation: ShopCreation;
    public contractor: Contractor;
    public payoutTool: PayoutTool = new PayoutTool();

    constructor(private claimDetailsService: ClaimDetailsService) {}

    public ngOnChanges() {
        const shopCreations = this.claimDetailsService.toShopCreation(this.partyModifications);
        this.shopCreation = last(shopCreations);
        const contractCreations = this.claimDetailsService.toContractCreations(this.partyModifications);
        this.contractor = last(contractCreations).contractor;
        const payoutToolCreation = last(this.claimDetailsService.toContractPayoutToolCreations(this.partyModifications));
        this.payoutTool.currency = payoutToolCreation.currency;
        this.payoutTool.details = payoutToolCreation.details;
    }
}
