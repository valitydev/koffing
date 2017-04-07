import { Component, Input } from '@angular/core';

import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';

@Component({
    selector: 'kof-payout-tool-view',
    templateUrl: 'payout-tool-view.component.pug'
})
export class PayoutToolViewComponent {

    @Input()
    public payoutTool: PayoutTool;
}
