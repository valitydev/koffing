import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

import { SelectionOptions } from '../selection-options.class';
import { ContractDecision } from './contract-decision.class';
import { ContractorTransfer } from './create-contract/contractor-transfer.class';
import { Contract } from 'koffing/backend/classes/contract.class';
import { CreateContractComponent } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/create-contract/create-contract.component';
import { SelectContractComponent } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/select-contract/select-contract.component';

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
    @ViewChild('createContractRef')
    private createContractComponent: CreateContractComponent;
    @ViewChild('selectContractRef')
    private selectContractComponent: SelectContractComponent;

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
        } else {
            if (this.selectedOption === this.optionNew) {
                this.createContractComponent.highlightErrors();
            } else if (this.selectedOption === this.optionExisting) {
                this.selectContractComponent.highlightErrors();
            }
        }
    }
}
