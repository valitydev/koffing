import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BankAccount } from 'koffing/backend/model/bank-account';

@Component({
    selector: 'kof-payout-tool-form',
    templateUrl: 'payout-tool-form.component.pug'
})
export class PayoutToolFormComponent {

    @Input()
    public form: FormGroup;

    @Input()
    public bankAccount: BankAccount;

    public isCopyBankAccount: boolean = false;

    public copyBankAccount() {
        this.form.setValue(this.bankAccount);
    }
}
