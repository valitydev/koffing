import { Component, Input } from '@angular/core';
import { Contract } from 'koffing/backend';

@Component({
    selector: 'kof-contract-details',
    templateUrl: 'contract-details.component.pug'
})
export class ContractDetailsComponent {

    @Input()
    public contract: Contract;

    public getContractLabel(): string {
        if (this.contract) {
            return this.contract.status === 'active' ? 'label-success' : 'label-danger';
        }
    }

    public getContractStatus(): string {
        if (this.contract) {
            return this.contract.status === 'active' ? 'Активен' : 'Расторгнут';
        }
    }
}
