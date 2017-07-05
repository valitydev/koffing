import { Component, Input } from '@angular/core';

import { Contract } from 'koffing/backend/model/contract';

@Component({
    selector: 'kof-contract-creation',
    templateUrl: 'contract-creation.component.pug',
    styles: [`:host { cursor: pointer; }`]
})
export class ContractCreationComponent {

    @Input()
    public contract: Contract;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}
