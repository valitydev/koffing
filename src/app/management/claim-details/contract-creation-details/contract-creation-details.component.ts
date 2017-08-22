import { Component, Input, OnChanges } from '@angular/core';
import { ContractCreation, Contractor } from 'koffing/backend';
import { last } from 'lodash';

@Component({
    selector: 'kof-contract-creation-details',
    templateUrl: 'contract-creation-details.component.pug'
})
export class ContractCreationDetailsComponent implements OnChanges {

    @Input()
    public contractCreations: ContractCreation[];

    public contractor: Contractor;

    public ngOnChanges() {
        if (this.contractCreations) {
            this.contractor = last(this.contractCreations).contractor;
        }
    }
}
