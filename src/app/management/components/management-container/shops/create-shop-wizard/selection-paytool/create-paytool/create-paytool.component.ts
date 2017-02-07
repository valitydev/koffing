import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { PayoutToolBankAccount } from 'koffing/backend/classes/payout-tool-bank-account.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';

@Component({
    selector: 'kof-create-paytool',
    templateUrl: 'create-paytool.component.pug'
})
export class CreatePayoutToolComponent implements OnInit {

    @Output()
    public onPayoutToolReady = new EventEmitter();

    public payoutTool: PayoutToolBankAccount;

    public ngOnInit() {
        this.payoutTool = this.getInstance();
    }

    public checkForm(form: any) {
        if (form.valid) {
            this.onPayoutToolReady.emit(this.payoutTool);
        }
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
