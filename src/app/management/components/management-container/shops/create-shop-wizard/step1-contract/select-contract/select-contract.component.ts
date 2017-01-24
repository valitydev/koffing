import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { SelectItem } from 'koffing/common/common.module';
import { Contract } from 'koffing/backend/classes/contract.class';

@Component({
    selector: 'kof-select-contract',
    templateUrl: 'select-contract.component.pug'
})
export class SelectContractComponent implements OnInit {

    public selectableItems: SelectItem[] = [];
    
    public selectedContractId: number;

    @Output()
    public contractSelected = new EventEmitter();

    @Input()
    public contracts: Contract[];

    private selectedContract: Contract;

    public selectContract() {
        this.selectedContract = _.find(this.contracts, (contract) => {
            return contract.id === Number(this.selectedContractId);
        });
        this.contractSelected.emit({
            contract: this.selectedContract
        });
    }

    public prepareSelectableItems() {
        this.selectableItems = _.map(this.contracts, (contract) => {
            return new SelectItem(contract.id, String(contract.id));
        });
    }
    
    public ngOnInit() {
        this.prepareSelectableItems();
    }
}
