import { Component, Input } from '@angular/core';
import { BankAccount } from 'koffing/backend/model/bank-account';

@Component({
    selector: 'kof-bank-account-details',
    templateUrl: 'bank-account-details.component.pug'
})
export class BankAccountDetailsComponent {
    @Input()
    public bankAccount: BankAccount;
}
