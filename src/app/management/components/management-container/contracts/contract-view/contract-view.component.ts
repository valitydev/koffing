import { Component, Input } from '@angular/core';

import { Contract } from 'koffing/backend/classes/contract.class';

@Component({
    selector: 'kof-contract-view',
    templateUrl: 'contract-view.component.pug'
})
export class ContractViewComponent {

    @Input()
    public contract: Contract;
}
