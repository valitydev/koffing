import { Component, Input, OnInit } from '@angular/core';

import { ContractAdjustmentCreation } from 'koffing/backend';

@Component({
    selector: 'kof-contract-adjustment-creation',
    templateUrl: 'contract-adjustment-creation.component.pug'
})
export class ContractAdjustmentCreationComponent {
    @Input()
    public adjustment: ContractAdjustmentCreation;
}
