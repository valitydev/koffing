import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';

import { SelectionOptions } from '../selection-options.class';
import { ShopModificationArgs } from 'koffing/management/management.module';
import { ContractService } from 'koffing/backend/services/contract.service';
import { ClaimService } from 'koffing/backend/backend.module';
import { Claim } from 'koffing/backend/classes/claim.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';
import { Contract } from 'koffing/backend/classes/contract.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';

@Component({
    selector: 'kof-selection-contract',
    templateUrl: 'selection-contract.component.pug'
})
export class SelectionContractComponent implements OnInit {

    @Input()
    public showFinishButton: boolean = false;
    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isContractReady: boolean = false;
    
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
        this.args.isNewContract = false;
        this.removeContractInstance();
    }

    public removeContractInstance() {
        delete this.args.contract;
        this.isContractReady = false;
    }

    public createNewContractInstance() {
        const bankAccountArgs = new BankAccount();
        const entityArgs = new RussianLegalEntity();
        this.args.contract = new Contract();
        this.args.contract.contractor = new Contractor();
        this.args.contract.contractor.bankAccount = bankAccountArgs;
        this.args.contract.contractor.entity = entityArgs;
        this.isContractReady = false;
    }

    public newContractReady(params: any) {
        this.isContractReady = params.valid;
    }

    public contractSelected(params: any) {
        this.args.contract = params.contract;
        this.isContractReady = true;
    }

    public selectOptionNew() {
        this.createNewContractInstance();
        this.selectedOption = this.optionNew;
    }

    public selectOptionExisting() {
        this.removeContractInstance();
        this.selectedOption = this.optionExisting;
    }

    public stepForward() {
        if (this.selectedOption === this.optionNew) {
            this.createContract();
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

    private createContract() {
        this.args.isLoading = true;
        this.contractService.createContract(this.args.contract.contractor).then(
            (result: any) => {
                this.claimService.getClaimById(result.claimID).then(
                    (claim: Claim) => {
                        this.args.isLoading = false;
                        let contractCreationChangeset = _.find(claim.changeset, (set) => {
                            return set.modificationType === 'ContractCreation';
                        });
                        this.args.contract = contractCreationChangeset.contract;
                        this.args.isNewContract = true;
                        this.confirmForward();
                    }
                );
            }
        );
    }
}
