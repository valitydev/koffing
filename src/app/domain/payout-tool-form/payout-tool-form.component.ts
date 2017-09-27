import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { BankAccount } from 'koffing/backend';

@Component({
    selector: 'kof-payout-tool-form',
    templateUrl: 'payout-tool-form.component.pug'
})
export class PayoutToolFormComponent implements OnInit {

    @Input()
    public form: FormGroup;

    @Input()
    public bankAccount: BankAccount;

    public bankAccountForm: AbstractControl;
    public isCopyBankAccount: boolean = false;

    public ngOnInit() {
        this.bankAccountForm = this.form.get('bankAccount');
    }

    public copyBankAccount(isCopy: boolean) {
        if (isCopy) {
            this.bankAccountForm.setValue(this.bankAccount);
        }
    }
}
