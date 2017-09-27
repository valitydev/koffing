import { Component, Input, OnChanges } from '@angular/core';
import { last } from 'lodash';

import { BankAccount, Contractor, PartyModification, PayoutToolBankAccount, Shop } from 'koffing/backend';
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

    public bankAccount: BankAccount;

    constructor(
        private shopService: ShopService,
        private claimDetailsService: ClaimDetailsService
    ) { }

    public ngOnChanges() {
        const bindings = this.claimDetailsService.toContractBinding(this.partyModifications);
        const contractBinding = last(bindings);
        this.shopService.getShopByID(contractBinding.shopID).subscribe((shop) => this.shop = shop);
        const contractCreations = this.claimDetailsService.toContractCreations(this.partyModifications);
        this.contractor = last(contractCreations).contractor;
        const payoutToolCreation = last(this.claimDetailsService.toContractPayoutToolCreations(this.partyModifications));
        const payoutToolDetails = payoutToolCreation.details as PayoutToolBankAccount;
        this.bankAccount = payoutToolDetails.bankAccount;
    }
}
