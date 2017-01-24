import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';

import { SelectionOptions } from './../selection-options.class';
import { WizardArgs } from 'koffing/management/management.module';
import { ContractService } from 'koffing/backend/services/contract.service';
import { ClaimService } from 'koffing/backend/backend.module';
import { Claim } from 'koffing/backend/classes/claim.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';
import { Contract } from 'koffing/backend/classes/contract.class';
import { Contractor } from 'koffing/backend/classes/contractor.class';

@Component({
    selector: 'kof-step1-contract',
    templateUrl: 'step1-contract.component.pug'
})
export class Step1ContractComponent implements OnInit {

    public selectedOption: SelectionOptions;
    public optionNew: number = SelectionOptions.New;
    public optionExisting: number = SelectionOptions.Existing;
    public isContractReady: boolean = false;
    
    @Output()
    public steppedForward = new EventEmitter();
    @Output()
    public steppedBackward = new EventEmitter();

    @Input()
    private wizardArgs: WizardArgs;

    constructor(
        private contractService: ContractService,
        private claimService: ClaimService
    ) { }

    public ngOnInit() {
        this.wizardArgs.isNewContract = false;
        this.removeContractInstance();
    }

    public removeContractInstance() {
        delete this.wizardArgs.contract;
        this.isContractReady = false;
    }

    public createNewContractInstance() {
        const bankAccountArgs = new BankAccount();
        const entityArgs = new RussianLegalEntity();
        this.wizardArgs.contract = new Contract();
        this.wizardArgs.contract.contractor = new Contractor();
        this.wizardArgs.contract.contractor.bankAccount = bankAccountArgs;
        this.wizardArgs.contract.contractor.entity = entityArgs;
        this.isContractReady = false;
    }

    public newContractReady(params: any) {
        this.isContractReady = params.valid;
    }

    public contractSelected(params: any) {
        this.wizardArgs.contract = params.contract;
        this.isContractReady = true;
    };

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
        this.wizardArgs.isLoading = true;
        this.contractService.createContract(this.wizardArgs.contract.contractor).then(
            (result: any) => {
                this.claimService.getClaimById(result.claimID).then(
                    (claim: Claim) => {
                        this.wizardArgs.isLoading = false;
                        let contractCreationChangeset = _.find(claim.changeset, (set) => {
                            return set.modificationType === 'ContractCreation';
                        });
                        this.wizardArgs.contract = contractCreationChangeset.contract;
                        this.wizardArgs.isNewContract = true;
                        this.confirmForward();
                    }
                );
            }
        );
    }
}
