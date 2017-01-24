import { Component, Input } from '@angular/core';

import { PayoutAccount } from 'koffing/backend/classes/payout-account.class';

@Component({
    selector: 'kof-payout-account-view',
    templateUrl: 'payout-account-view.component.pug'
})
export class PayoutAccountViewComponent {

    @Input()
    public payoutAccount: PayoutAccount;
}
