import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { SelectionOptions } from '../selection-options.class';
import { Claim } from 'koffing/backend/classes/claim.class';
import { ClaimService } from 'koffing/backend/services/claim.service';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { ContractService } from 'koffing/backend/services/contract.service';
import { ContractParams } from 'koffing/backend/classes/contract-params.class';
import { ContractDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/contract-decision.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';
import { PayoutToolParams } from 'koffing/backend/classes/payout-tool-params.class';
import { PaytoolDecision } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/paytool-decision.class';

@Component({
    selector: 'kof-selection-paytool',
    templateUrl: 'selection-paytool.component.pug'
})
export class SelectionPaytoolComponent implements OnInit {

    @Input()
    public showFinishButton: boolean = false;
    @Input()
    public contractDecision: ContractDecision;

    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isPayoutAccountReady: boolean = false;
    public payoutToolsParams: PayoutToolBankAccount;
    public payoutToolID: number;

    public isLoading: boolean = false;

    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();

    constructor(private contractService: ContractService,
                private claimService: ClaimService) {
    }

    public ngOnInit() {
        if (!_.isUndefined(this.contractDecision.contractor)) {
            this.selectedOption = this.optionNew;
        }
    }

    public onPayoutToolReady(payoutTool: PayoutToolBankAccount) {
        this.isPayoutAccountReady = true;
        this.payoutToolsParams = payoutTool;
    }

    public onPayoutToolSelected(payoutToolID: number) {
        this.isPayoutAccountReady = true;
        this.payoutToolID = payoutToolID;
    }

    public selectOptionExisting() {
        this.selectedOption = this.optionExisting;
        this.isPayoutAccountReady = false;
    }

    public selectOptionNew() {
        this.selectedOption = this.optionNew;
        this.isPayoutAccountReady = false;
    }

    public stepForward() {
        // new contract and new payout tools
        if (!_.isUndefined(this.contractDecision.contractor) && !_.isUndefined(this.payoutToolsParams)) {
            this.isLoading = true;
            this.createContract(this.contractDecision.contractor, this.payoutToolsParams).then((decision: PaytoolDecision) => {
                this.isLoading = false;
                this.steppedForward.emit(decision);
            });
        // selected contract and new payout tools
        } else if (!_.isUndefined(this.contractDecision.contractID) && !_.isUndefined(this.payoutToolsParams)) {
            this.isLoading = true;
            this.createPayoutTool(this.contractDecision.contractID, this.payoutToolsParams).then((decision: PaytoolDecision) => {
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

    private createPayoutTool(contractID: number, payoutToolsParams: PayoutToolBankAccount) {
        return new Promise((resolve) => {
            this.contractService.createPayoutTool(contractID, payoutToolsParams).then((result: any) => {
                this.claimService.getClaimById(result.claimID).then((claim: Claim) => {
                    const payoutToolID = this.getPayoutToolId(contractID, claim.changeset);
                    resolve(new PaytoolDecision(contractID, payoutToolID));
                });
            });
        });
    }

    private createContract(contractor: Contractor, payoutToolsParams: PayoutToolParams): Promise<PaytoolDecision> {
        const contractParams = new ContractParams();
        contractParams.contractor = contractor;
        contractParams.payoutToolParams = payoutToolsParams;
        return new Promise((resolve) => {
            this.contractService.createContract(contractParams).then((result: any) => {
                this.claimService.getClaimById(result.claimID).then((claim: Claim) => {
                        const contractID = this.getContractId(claim.changeset);
                        const payoutToolID = this.getPayoutToolId(contractID, claim.changeset);
                        resolve(new PaytoolDecision(contractID, payoutToolID));
                    }
                );
            });
        });
    }

    private getContractId(changeset: any[]): number {
        const contractCreationChangeset = _.filter(changeset, (item) => item.partyModificationType === 'ContractCreation');
        const sortedChangeset = _.sortBy(contractCreationChangeset, (item) => item.contract.id);
        const last = _.last(sortedChangeset);
        return last.contract.id;
    }

    private getPayoutToolId(contractId: number, changeset: any[]): number {
        const payoutChangeset = _.filter(changeset, (item) =>
        item.partyModificationType === 'ContractModification' && item.contractModificationType === 'ContractPayoutToolCreation');
        const found = _.find(payoutChangeset, (item) => item.contractID === contractId);
        return found.payoutTool.id;
    }
}
