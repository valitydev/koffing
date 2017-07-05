import { Component, Input } from '@angular/core';

import { Contract } from 'koffing/backend/model/contract';

@Component({
    selector: 'kof-contract-view',
    templateUrl: 'contract-view.component.pug'
})
export class ContractViewComponent {

    @Input()
    public contract: Contract;
}
