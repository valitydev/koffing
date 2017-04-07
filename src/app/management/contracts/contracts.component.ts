import { Component, OnInit } from '@angular/core';

import { ContractService } from 'koffing/backend/services/contract.service';
import { Contract } from 'koffing/backend/classes/contract.class';
import { ClaimRevokeBroadcaster } from 'koffing/broadcaster/services/claim-revoke-broadcaster.service';
import { Claim } from '../shared/claim.class';
import { ClaimService } from '../shared/claim.service';

@Component({
    templateUrl: 'contracts.component.pug'
})
export class ContractsComponent implements OnInit {

    public contracts: Contract[] = [];
    public isLoading: boolean = false;
    public selectedContract: Contract;
    public claimFound: boolean = false;

    constructor(
        private contractService: ContractService,
        private claimRevokeBroadcaster: ClaimRevokeBroadcaster,
        private claimService: ClaimService
    ) {}

    public ngOnInit() {
        this.loadData();
        this.claimRevokeBroadcaster.on().subscribe(() => {
            this.isLoading = true;
            this.checkClaim().then(() => {
                this.isLoading = false;
            });
        });
    }

    public loadData() {
        this.isLoading = true;
        Promise.all([
            this.getContracts(),
            this.checkClaim()
        ]).then(() => {
            this.isLoading = false;
        });
    }

    public selectContract(contract: Contract) {
        if (this.selectedContract === contract) {
            this.selectedContract = new Contract();
        } else {
            this.selectedContract = contract;
        }
    }

    private getContracts(): Promise<Contract[]> {
        return new Promise((resolve) => {
            this.contractService.getContracts().then((contracts: Contract[]) => {
                this.contracts = contracts;
                resolve();
            });
        });
    }

    private checkClaim(): Promise<Claim[]> {
        return new Promise((resolve) => {
            this.claimService.getClaim({status: 'pending'}).then((claims: Claim[]) => {
                this.claimFound = claims.length > 0;
                resolve();
            });
        });
    }
}
