import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { SelectItem } from 'koffing/common/components/select/select.class';
import { PayoutAccount } from 'koffing/backend/classes/payout-account.class';

@Component({
    selector: 'kof-select-payout-account',
    templateUrl: 'select-payout-account.component.pug'
})
export class SelectPayoutAccountComponent implements OnInit {

    public selectableItems: SelectItem[] = [];

    public selectedPayoutAccountId: number;

    @Output()
    public payoutAccountSelected = new EventEmitter();

    @Input()
    private payoutAccounts: PayoutAccount[];

    private selectedPayoutAccount: PayoutAccount;

    public selectPayoutAccount() {
        this.selectedPayoutAccount = _.find(this.payoutAccounts, (payoutAccount) => {
            return payoutAccount.id === Number(this.selectedPayoutAccountId);
        });
        this.payoutAccountSelected.emit({
            payoutAccount: this.selectedPayoutAccount
        });
    }

    public prepareSelectableItems() {
        this.selectableItems = _.map(this.payoutAccounts, (payoutAccount) => {
            return new SelectItem(payoutAccount.id, String(payoutAccount.id));
        });
    }

    public ngOnInit() {
        this.prepareSelectableItems();
    }
}
