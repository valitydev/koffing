import { Component, Output, EventEmitter } from '@angular/core';

import { SelectionOptions } from '../selection-options.class';
import { ContractDecision } from './contract-decision.class';
import { ContractorTransfer } from './create-contract/contractor-transfer.class';
import { Contract } from 'koffing/backend/classes/contract.class';

@Component({
    selector: 'kof-selection-contract',
    templateUrl: 'selection-contract.component.pug'
})
export class SelectionContractComponent {

    @Output()
    public steppedForward = new EventEmitter();

    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isContractorValid: boolean = false;
    public decision: ContractDecision = new ContractDecision();

    public onChangeContractor(value: ContractorTransfer) {
        this.isContractorValid = value.valid;
        this.decision.contractor = value.contractor;
    }

    public onContractSelected(contract: Contract) {
        this.isContractorValid = true;
        this.decision.contract = contract;
    }

    public selectOptionNew() {
        this.isContractorValid = false;
        this.selectedOption = this.optionNew;
    }

    public selectOptionExisting() {
        this.isContractorValid = false;
        this.selectedOption = this.optionExisting;
    }

    public stepForward() {
        if (this.isContractorValid) {
            this.steppedForward.emit(this.decision);
        }
    }
}
