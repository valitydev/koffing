import { Component, Input } from '@angular/core';

import { ContractTermination } from 'koffing/backend';

@Component({
    selector: 'kof-contract-termination',
    templateUrl: 'contract-termination.component.pug'
})
export class ContractTerminationComponent {
    @Input()
    public termination: ContractTermination;
}
