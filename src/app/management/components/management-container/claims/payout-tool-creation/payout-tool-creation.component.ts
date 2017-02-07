import { Component, Input } from '@angular/core';

import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';

@Component({
    selector: 'kof-payout-tool-creation',
    templateUrl: 'payout-tool-creation.component.pug'
})
export class PayoutToolCreationComponent {

    @Input()
    public payoutTool: PayoutTool;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}
