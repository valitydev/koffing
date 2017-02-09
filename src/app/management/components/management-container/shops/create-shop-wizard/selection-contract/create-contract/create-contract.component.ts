import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { Contractor } from 'koffing/backend/classes/contractor.class';
import { BankAccount } from 'koffing/backend/classes/bank-account.class';
import { RussianLegalEntity } from 'koffing/backend/classes/russian-legal-entity.class';
import { ContractorTransfer } from 'koffing/management/components/management-container/shops/create-shop-wizard/selection-contract/create-contract/contractor-transfer.class';

@Component({
    selector: 'kof-create-contract',
    templateUrl: 'create-contract.component.pug'
})
export class CreateContractComponent implements OnInit {

    @Output()
    public onChange = new EventEmitter();

    public contractor: Contractor;

    public ngOnInit() {
        this.contractor = this.createInstance();
    }

    public keyup(form: any) {
        this.onChange.emit(new ContractorTransfer(this.contractor, form.valid));
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }

    private createInstance() {
        const bankAccountArgs = new BankAccount();
        const entityArgs = new RussianLegalEntity();
        const instance = new Contractor();
        instance.bankAccount = bankAccountArgs;
        instance.legalEntity = entityArgs;
        return instance;
    }
}
