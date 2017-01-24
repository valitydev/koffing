import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ClaimService } from 'koffing/backend/services/claim.service';
import { Claim } from 'koffing/backend/classes/claim.class';
import { ContractService } from 'koffing/backend/services/contract.service';
import { Contract } from 'koffing/backend/classes/contract.class';

@Component({
    templateUrl: 'contracts.component.pug'
})
export class ContractsComponent implements OnInit {

    public contracts: Contract[] = [];
    public isLoading: boolean;

    constructor(
        private claimService: ClaimService,
        private contractService: ContractService
    ) {}

    public ngOnInit() {
        this.isLoading = true;
        this.getContracts().then((contracts: Contract[]) => {
            this.contracts = contracts;
            this.isLoading = false;
        });
    }

    private loadContracts(): Promise<Contract[]> {
        return this.contractService.getContracts().then((contracts: Contract[]) => contracts);
    }

    private loadContractsClaimed(): Promise<Contract[]> {
        return this.claimService.getClaim({status: 'pending'}).then((claim: Claim) => {
            return _
                .chain(claim.changeset)
                .filter((changeSet) => changeSet.modificationType === 'ContractCreation')
                .map((changeSet) => changeSet.contract)
                .value();
        });
    }

    private getContracts(): Promise<Contract[]> {
        return Promise.all([
            this.loadContracts(),
            this.loadContractsClaimed()
        ]).then((contracts: any) => {
            return _.reduce(contracts, (current: Contract[], next: Contract[]) => _.concat(current, next));
        });
    }
}
