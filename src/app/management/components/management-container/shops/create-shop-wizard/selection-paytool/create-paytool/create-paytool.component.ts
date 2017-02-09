import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { PaytoolTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-paytool/create-paytool/paytool-transfer.class';

@Component({
    selector: 'kof-create-paytool',
    templateUrl: 'create-paytool.component.pug'
})
export class CreatePayoutToolComponent implements OnInit {

    @Output()
    public onChange = new EventEmitter();

    public payoutTool: PayoutToolBankAccount;

    public ngOnInit() {
        this.payoutTool = this.getInstance();
    }

    public checkForm(form: any) {
        this.onChange.emit(new PaytoolTransfer(this.payoutTool, form.valid));
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    private getInstance() {
        const bankAccount = new BankAccount();
        const instance = new PayoutToolBankAccount();
        instance.bankAccount = bankAccount;
        return instance;
    }
}
