import { Component, Output, EventEmitter, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';

import { SelectionOptions } from '../selection-options.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { ContractDecision } from '../selection-contract/contract-decision.class';
import { PaytoolDecision } from './paytool-decision.class';
import { PaytoolTransfer } from './create-paytool/paytool-transfer.class';
import { PaytoolDecisionService } from './paytool-decision.service';

@Component({
    selector: 'kof-selection-paytool',
    templateUrl: 'selection-paytool.component.pug'
})
export class SelectionPaytoolComponent implements AfterViewInit {

    @Input()
    public showFinishButton: boolean = false;
    @Input()
    public contractDecision: ContractDecision;

    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isPayoutToolValid: boolean = false;
    public payoutToolsParams: PayoutToolBankAccount;
    public payoutToolID: number;

    public isLoading: boolean = false;

    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();

    constructor(private paytoolDecisionService: PaytoolDecisionService,
                private changeDetector: ChangeDetectorRef) {
    }

    public ngAfterViewInit() {
        if (!_.isUndefined(this.contractDecision.contractor)) {
            this.selectedOption = this.optionNew;
            this.changeDetector.detectChanges();
        }
    }

    public onPayoutToolChange(value: PaytoolTransfer) {
        this.isPayoutToolValid = value.valid;
        this.payoutToolsParams = value.payoutTool;
    }

    public onPayoutToolSelected(payoutToolID: number) {
        this.isPayoutToolValid = true;
        this.payoutToolID = payoutToolID;
    }

    public selectOptionExisting() {
        this.selectedOption = this.optionExisting;
    }

    public selectOptionNew() {
        this.selectedOption = this.optionNew;
    }

    public stepForward() {
        if (!this.isPayoutToolValid) {
            return;
        }
        // new contract and new payout tools
        if (!_.isUndefined(this.contractDecision.contractor) && !_.isUndefined(this.payoutToolsParams)) {
            this.isLoading = true;
            this.paytoolDecisionService.createContract(this.contractDecision.contractor, this.payoutToolsParams).then((decision: PaytoolDecision) => {
                this.isLoading = false;
                this.steppedForward.emit(decision);
            });
            // selected contract and new payout tools
        } else if (!_.isUndefined(this.contractDecision.contractID) && !_.isUndefined(this.payoutToolsParams)) {
            this.isLoading = true;
            this.paytoolDecisionService.createPayoutTool(this.contractDecision.contractID, this.payoutToolsParams).then((decision: PaytoolDecision) => {
                this.isLoading = false;
                this.steppedForward.emit(decision);
            });
            // selected contract and selected payout tools
        } else if (!_.isUndefined(this.contractDecision.contractID) && !_.isUndefined(this.payoutToolID)) {
            this.steppedForward.emit(new PaytoolDecision(this.contractDecision.contractID, this.payoutToolID));
        }
    }

    public stepBackward() {
        this.steppedBackward.emit();
    }
}
