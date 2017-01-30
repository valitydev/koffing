import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { SelectionOptions } from '../selection-options.class';
import { ShopModificationArgs } from 'koffing/management/management.module';
import { Claim } from 'koffing/backend/classes/claim.class';
import { ClaimService } from 'koffing/backend/services/claim.service';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { PayoutAccount } from 'koffing/backend/classes/payout-account.class';
import { ContractService } from 'koffing/backend/services/contract.service';

@Component({
    selector: 'kof-selection-account',
    templateUrl: 'selection-account.component.pug'
})
export class SelectionAccountComponent implements OnInit {

    @Input()
    public showFinishButton: boolean = false;
    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isPayoutAccountReady: boolean = false;

    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();

    @Input()
    private args: ShopModificationArgs;

    constructor(
        private contractService: ContractService,
        private claimService: ClaimService
    ) { }

    public ngOnInit() {
        this.removePayoutAccountInstance();

        if (this.args.isNewContract) {
            this.selectOptionNew();
        }
    }

    public removePayoutAccountInstance() {
        delete this.args.payoutAccount;
        this.isPayoutAccountReady = false;
    }

    public createNewPayoutAccountInstance() {
        const bankAccountArgs = new BankAccount();
        const payoutToolBankAccount = new PayoutToolBankAccount();
        payoutToolBankAccount.bankAccount = bankAccountArgs;
        this.args.payoutAccount = new PayoutAccount();
        this.args.payoutAccount.tool = payoutToolBankAccount;
        this.isPayoutAccountReady = false;
    }

    public selectOptionNew() {
        this.createNewPayoutAccountInstance();
        this.selectedOption = this.optionNew;
    }

    public selectOptionExisting() {
        this.removePayoutAccountInstance();
        this.selectedOption = this.optionExisting;

    }

    public newPayoutAccountReady(params: any) {
        this.isPayoutAccountReady = params.valid;
    }

    public payoutAccountSelected(params: any) {
        this.args.payoutAccount = params.payoutAccount;
        this.isPayoutAccountReady = true;
    }

    public createPayoutAccount() {
        this.args.isLoading = true;
        this.contractService.createPayoutAccount(this.args.contract.id, this.args.payoutAccount).then(
            (result: any) => {
                this.claimService.getClaimById(result.claimID).then(
                    (claim: Claim) => {
                        this.args.isLoading = false;
                        let payoutAccountCreationChangeset = _.find(claim.changeset, (set) => {
                            return set.modificationType === 'PayoutAccountCreation';
                        });
                        this.args.payoutAccount = payoutAccountCreationChangeset.payoutAccount;
                        this.confirmForward();
                    }
                );
            }
        );
    }

    public stepForward() {
        if (this.selectedOption === this.optionNew) {
            this.createPayoutAccount();
        } else {
            this.confirmForward();
        }
    }

    public stepBackward() {
        this.confirmBackward();
    }

    private confirmForward() {
        this.steppedForward.emit();
    }

    private confirmBackward() {
        this.steppedBackward.emit();
    }
}
