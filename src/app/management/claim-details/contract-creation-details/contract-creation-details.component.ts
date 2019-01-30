import { Component, Input, OnChanges } from '@angular/core';
import { last } from 'lodash';

import { Contractor, PartyModification, PayoutTool, Shop } from 'koffing/backend';
import { ShopService } from 'koffing/backend/shop.service';
import { ClaimDetailsService } from '../claim-details.service';

@Component({
    selector: 'kof-contract-creation-details',
    templateUrl: 'contract-creation-details.component.pug'
})
export class ContractCreationDetailsComponent implements OnChanges {
    @Input()
    public partyModifications: PartyModification[];

    public shop: Shop;
    public contractor: Contractor;
    public payoutTool: PayoutTool = new PayoutTool();

    constructor(
        private shopService: ShopService,
        private claimDetailsService: ClaimDetailsService
    ) {}

    public ngOnChanges() {
        const contractBinding = last(
            this.claimDetailsService.toContractBinding(this.partyModifications)
        );
        this.shopService.getShopByID(contractBinding.shopID).subscribe(shop => (this.shop = shop));
        const contractCreation = last(
            this.claimDetailsService.toContractCreations(this.partyModifications)
        );
        this.contractor = contractCreation.contractor;
        const payoutToolCreation = last(
            this.claimDetailsService.toContractPayoutToolCreations(this.partyModifications)
        );
        this.payoutTool.currency = payoutToolCreation.currency;
        this.payoutTool.details = payoutToolCreation.details;
    }
}
