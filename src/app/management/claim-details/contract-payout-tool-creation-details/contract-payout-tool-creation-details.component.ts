import { Component, Input, OnChanges } from '@angular/core';
import { last } from 'lodash';
import { ContractPayoutToolCreation } from 'koffing/backend';

@Component({
    selector: 'kof-contract-payout-tool-creation-details',
    templateUrl: 'contract-payout-tool-creation-details.component.pug'
})
export class ContractPayoutToolCreationDetailsComponent implements OnChanges {

    @Input()
    public contractPayoutToolCreations: ContractPayoutToolCreation[];

    public contractPayoutToolCreation: ContractPayoutToolCreation;

    public ngOnChanges() {
        this.contractPayoutToolCreation = last(this.contractPayoutToolCreations);
    }
}
