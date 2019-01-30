import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { last } from 'lodash';

import { Contract, PayoutTool, Shop, PartyModification } from 'koffing/backend';
import { ContractService } from 'koffing/backend/contract.service';
import { PayoutToolService } from 'koffing/backend/payout-tool.service';
import { ShopService } from 'koffing/backend/shop.service';
import { ClaimDetailsService } from '../claim-details.service';

@Component({
    selector: 'kof-contract-binding-details',
    templateUrl: 'contract-binding-details.component.pug'
})
export class ContractBindingDetailsComponent implements OnChanges {
    @Input()
    public partyModifications: PartyModification[];

    public contract: Contract;
    public payoutTool: PayoutTool;
    public shop: Shop;

    constructor(
        private contractService: ContractService,
        private payoutToolService: PayoutToolService,
        private shopService: ShopService,
        private claimDetailsService: ClaimDetailsService
    ) {}

    public ngOnChanges() {
        const bindings = this.claimDetailsService.toContractBinding(this.partyModifications);
        const contractBinding = last(bindings);
        Observable.zip(
            this.contractService.getContractByID(contractBinding.contractID),
            this.payoutToolService.getPayoutToolByID(
                contractBinding.contractID,
                contractBinding.payoutToolID
            ),
            this.shopService.getShopByID(contractBinding.shopID)
        ).subscribe(response => {
            this.contract = response[0];
            this.payoutTool = response[1];
            this.shop = response[2];
        });
    }
}
