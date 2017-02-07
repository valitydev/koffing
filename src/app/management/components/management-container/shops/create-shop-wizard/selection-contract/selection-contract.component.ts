import { Component, Output, EventEmitter, Input } from '@angular/core';

import { SelectionOptions } from '../selection-options.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { ContractDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/contract-decision.class';

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
    public isContractorReady: boolean = false;
    public decision: ContractDecision = new ContractDecision();
    
    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();

    public onContractorReady(contractor: Contractor) {
        this.isContractorReady = true;
        this.decision.contractor = contractor;
    }

    public onContractSelected(contractID: number) {
        this.isContractorReady = true;
        this.decision.contractID = contractID;
    }

    public newContractReady(params: any) {
        this.isContractorReady = params.valid;
    }

    public selectOptionNew() {
        this.selectedOption = this.optionNew;
    }

    public selectOptionExisting() {
        this.selectedOption = this.optionExisting;
        this.isContractorReady = false;
    }

    public stepForward() {
        if (this.isContractorReady) {
            this.steppedForward.emit(this.decision);
        }
    }

    public stepBackward() {
        this.steppedBackward.emit();
    }
}
