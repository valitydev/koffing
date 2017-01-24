import { Component, Input } from '@angular/core';

import { PayoutAccount } from 'koffing/backend/classes/payout-account.class';

@Component({
    selector: 'kof-payout-account-creation',
    templateUrl: 'payout-account-creation.component.pug'
})
export class PayoutAccountCreationComponent {

    @Input()
    public payoutAccount: PayoutAccount;

    public showPanel: boolean = false;

    public show() {
        this.showPanel = !this.showPanel;
    }
}
