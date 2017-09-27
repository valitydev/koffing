import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { find, chain } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { ContractService } from 'koffing/backend/contract.service';
import { Contract } from 'koffing/backend';

@Component({
    selector: 'kof-contract-select',
    templateUrl: 'contract-select.component.pug',
    styleUrls: ['contract-select.component.less']
})
export class ContractSelectComponent implements OnChanges {

    @Input()
    public currentContractID: string;

    @Output()
    public onSelect: EventEmitter<Contract> = new EventEmitter();

    public selectedContractID: string;
    public contracts: Contract[];
    public contractItems: SelectItem[];

    constructor(private contractService: ContractService) { }
    
    public ngOnChanges() {
        this.contractService.getContracts().subscribe((contracts: Contract[]) => {
            this.contracts = contracts;
            const currentContract = find(this.contracts, (contract: Contract) => contract.id === this.currentContractID);
            this.contractItems = this.getContractItems(this.contracts, currentContract ? currentContract.id : '');
            this.select(currentContract ? currentContract.id : this.contractItems[0].value);
        });
    }

    public select(contractID: string) {
        this.selectedContractID = contractID;
        const selectedContract = find(this.contracts, (contract: Contract) => contract.id === contractID);
        this.onSelect.emit(selectedContract);
    }

    private getContractItems(contracts: Contract[], currentContractID?: string): SelectItem[] {
        const result = chain(contracts)
            .filter((contract: Contract) => contract.id !== 'TEST' && contract.id !== currentContractID)
            .map((contract: Contract, index) => new SelectItem(contract.id, `Контракт ${index + 1}`))
            .push(new SelectItem('', 'Новый контракт'))
            .value();
        if (currentContractID) {
            result.unshift(new SelectItem(currentContractID, 'Текущий контракт'));
        }
        return result;
    }
}
