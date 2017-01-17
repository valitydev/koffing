import { Component, OnInit } from '@angular/core';

import { BankAccount } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-select-payout-account',
    templateUrl: 'select-payout-account.component.pug'
})
export class SelectPayoutAccountComponent implements OnInit {

    public currency: string;
    public bankAccountArgs: BankAccount;

    public ngOnInit() {
        this.currency = '';
        this.bankAccountArgs = new BankAccount();
    }

    public hasError() {
        // logic later
    }
}
