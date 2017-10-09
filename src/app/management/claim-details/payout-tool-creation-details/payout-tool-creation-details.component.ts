import { Component, Input, OnChanges } from '@angular/core';
import { last } from 'lodash';

import { Shop, Contract, PayoutTool, PartyModification } from 'koffing/backend';
import { ShopService } from 'koffing/backend/shop.service';
import { ContractService } from 'koffing/backend/contract.service';
import { ClaimDetailsService } from '../claim-details.service';

@Component({
    selector: 'kof-payout-tool-creation-details',
    templateUrl: 'payout-tool-creation-details.component.pug'
})
export class PayoutToolCreationDetailsComponent implements OnChanges {

    @Input()
    public partyModifications: PartyModification[];

    public shop: Shop;
    public contract: Contract;
    public payoutTool: PayoutTool = new PayoutTool();

    constructor(
        private shopService: ShopService,
        private contractService: ContractService,
        private claimDetailsService: ClaimDetailsService
    ) { }

    public ngOnChanges() {
        const contractBinding = last(this.claimDetailsService.toContractBinding(this.partyModifications));
        this.shopService.getShopByID(contractBinding.shopID).subscribe((shop) => this.shop = shop);
        this.contractService.getContractByID(contractBinding.contractID).subscribe((contract) => this.contract = contract);
        const payoutToolCreation = last(this.claimDetailsService.toContractPayoutToolCreations(this.partyModifications));
        this.payoutTool.currency = payoutToolCreation.currency;
        this.payoutTool.details = payoutToolCreation.details;
    }
}
