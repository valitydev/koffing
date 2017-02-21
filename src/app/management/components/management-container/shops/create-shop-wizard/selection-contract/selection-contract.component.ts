import { Component, Output, EventEmitter, Input } from '@angular/core';

import { SelectionOptions } from '../selection-options.class';
import { ContractDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/contract-decision.class';
import { ContractorTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer.class';
import { Contract } from 'koffing/backend/classes/contract.class';

@Component({
    selector: 'kof-selection-contract',
    templateUrl: 'selection-contract.component.pug'
})
export class SelectionContractComponent {

    @Input()
    public showFinishButton: boolean = false;
    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isContractorValid: boolean = false;
    public decision: ContractDecision = new ContractDecision();
    
    @Output()
    public steppedForward = new EventEmitter();

    public onChangeContractor(value: ContractorTransfer) {
        this.isContractorValid = value.valid;
        this.decision.contractor = value.contractor;
    }

    public onContractSelected(contract: Contract) {
        this.isContractorValid = true;
        this.decision.contract = contract;
    }

    public newContractReady(params: any) {
        this.isContractorValid = params.valid;
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
