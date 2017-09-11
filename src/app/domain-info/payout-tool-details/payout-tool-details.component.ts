import { Component, Input } from '@angular/core';
import { PayoutTool } from 'koffing/backend';

@Component({
    selector: 'kof-payout-tool-details',
    templateUrl: 'payout-tool-details.component.pug'
})
export class PayoutToolDetailsComponent {

    @Input()
    public payoutTool: PayoutTool;

}
