import { Component, Input } from '@angular/core';
import { PayoutSummary } from 'koffing/backend';

@Component({
    selector: 'kof-payout-summary',
    templateUrl: 'payout-summary.component.pug'
})
export class PayoutSummaryComponent {
    @Input()
    public summary: PayoutSummary[];
}
