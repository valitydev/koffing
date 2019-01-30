import { Component, Input } from '@angular/core';
import { Contract } from 'koffing/backend';

@Component({
    selector: 'kof-contract-details',
    templateUrl: 'contract-details.component.pug'
})
export class ContractDetailsComponent {
    @Input()
    public contract: Contract;
}
