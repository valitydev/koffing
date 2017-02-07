import { Component, OnInit } from '@angular/core';

import { ContractService } from 'koffing/backend/services/contract.service';
import { Contract } from 'koffing/backend/classes/contract.class';

@Component({
    templateUrl: 'contracts.component.pug'
})
export class ContractsComponent implements OnInit {

    public contracts: Contract[] = [];
    public isLoading: boolean = false;
    public selectedContract: Contract;

    constructor(
        private contractService: ContractService
    ) {}

    public ngOnInit() {
        this.isLoading = true;
        this.contractService.getContracts().then((contracts: Contract[]) => {
            this.contracts = contracts;
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
}
