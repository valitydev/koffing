import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { SelectItem } from 'koffing/common/common.module';
import { Contract } from 'koffing/backend/classes/contract.class';
import { ContractService } from 'koffing/backend/services/contract.service';

@Component({
    selector: 'kof-select-contract',
    templateUrl: 'select-contract.component.pug'
})
export class SelectContractComponent implements OnInit {

    @Output()
    public onContractSelected = new EventEmitter();

    public selectableItems: SelectItem[] = [];

    public selectedContractId: number;

    public contracts: Contract[];

    public selectedContract: Contract;

    public isLoading: boolean = true;

    constructor(private contractService: ContractService) { }

    public ngOnInit() {
         this.contractService.getContracts().then((contracts) => {
             this.isLoading = false;
             this.contracts = contracts;
             this.selectableItems = this.prepareSelectableItems(contracts);
         });
    }

    public selectContract() {
        this.selectedContract = this.findSelectedContract(this.contracts, this.selectedContractId);
        this.onContractSelected.emit(this.selectedContract);
    }

    private prepareSelectableItems(contracts: Contract[]) {
        return _.map(contracts, (contract: Contract) => new SelectItem(contract.id, String(contract.id)));
    }

    private findSelectedContract(contracts: Contract[], contractId: number) {
        return _.find(contracts, (contract: Contract) => contract.id === Number(contractId));
    }
}
