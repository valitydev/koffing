import { Component, Output, EventEmitter, Input, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { SelectionOptions } from '../selection-options.class';
import { ContractDecision } from '../selection-contract/contract-decision.class';
import { PaytoolDecision } from './paytool-decision.class';
import { PaytoolDecisionService } from './paytool-decision.service';
import { PaytoolTransfer } from './create-paytool/paytool-transfer.class';
import { CreatePayoutToolComponent } from './create-paytool/create-paytool.component';
import { SelectPaytoolComponent } from './select-paytool/select-paytool.component';

@Component({
    selector: 'kof-selection-paytool',
    templateUrl: 'selection-paytool.component.pug'
})
export class SelectionPaytoolComponent implements AfterViewInit {

    @Input()
    public contractDecision: ContractDecision;

    @Output()
    public steppedForward = new EventEmitter();

    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isPayoutToolValid: boolean = false;
    public payoutToolsParams: PayoutToolBankAccount;
    public payoutToolID: number;
    public isLoading: boolean = false;
    @ViewChild('createPaytoolRef')
    private createPayoutToolComponent: CreatePayoutToolComponent;
    @ViewChild('selectPaytoolRef')
    private selectPaytoolComponent: SelectPaytoolComponent;

    constructor(
        private paytoolDecisionService: PaytoolDecisionService,
        private changeDetector: ChangeDetectorRef
    ) {}

    public ngAfterViewInit() {
        if (!_.isUndefined(this.contractDecision.contractor)) {
            this.selectedOption = this.optionNew;
            this.changeDetector.detectChanges();
        }
    }

    public onPayoutToolChange(value: PaytoolTransfer) {
        this.isPayoutToolValid = value.valid;
        this.payoutToolsParams = value.payoutToolParams;
    }

    public onPayoutToolSelected(payoutToolID: number) {
        this.isPayoutToolValid = true;
        this.payoutToolID = payoutToolID;
    }

    public selectOptionExisting() {
        this.isPayoutToolValid = false;
        this.selectedOption = this.optionExisting;
    }

    public selectOptionNew() {
        this.isPayoutToolValid = false;
        this.selectedOption = this.optionNew;
    }

    public stepForward() {
        if (!this.isPayoutToolValid) {
            if (this.selectedOption === this.optionNew) {
                this.createPayoutToolComponent.highlightErrors();
            } else if (this.selectedOption === this.optionExisting) {
                this.selectPaytoolComponent.highlightErrors();
            }
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
        } else if (!_.isUndefined(this.contractDecision.contract) && !_.isUndefined(this.payoutToolsParams)) {
            this.isLoading = true;
            this.paytoolDecisionService.createPayoutTool(this.contractDecision.contract.id, this.payoutToolsParams).then((decision: PaytoolDecision) => {
                this.isLoading = false;
                this.steppedForward.emit(decision);
            });
            // selected contract and selected payout tools
        } else if (!_.isUndefined(this.contractDecision.contract) && !_.isUndefined(this.payoutToolID)) {
            this.steppedForward.emit(new PaytoolDecision(this.contractDecision.contract.id, this.payoutToolID));
        }
    }
}
