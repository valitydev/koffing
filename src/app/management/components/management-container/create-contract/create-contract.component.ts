import { Component, OnInit } from '@angular/core';

import { BankAccount } from 'koffing/backend/backend.module';
import { RussianLegalEntity } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-create-contract',
    templateUrl: 'create-contract.component.pug'
})
export class CreateContractComponent implements OnInit {

    public bankAccountArgs: BankAccount;
    public entityArgs: RussianLegalEntity;

    public ngOnInit() {
        this.bankAccountArgs = new BankAccount();
        this.entityArgs = new RussianLegalEntity();
    }

    public hasError() {
        // logic later
    }
}
