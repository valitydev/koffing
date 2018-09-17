import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';
import { camelCase } from 'lodash';

import { ContractPayoutToolCreation, PayoutToolDetailsBankAccount } from 'koffing/backend';
import { BankAccountFormService } from 'koffing/domain';

@Injectable()
export class PayoutToolFormService {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private bankAccountFormService: BankAccountFormService
    ) { }

    public initForm(type: string): FormGroup {
        return this.fb.group({
            bankAccount: this.bankAccountFormService.initForm(type),
            currency: ['RUB', [
                Validators.required,
                Validators.pattern(/^[A-Z]{3}$/)
            ]]
        });
    }

    public toPayoutToolCreation(contractID: string, payoutTool: FormGroup, type: string): ContractPayoutToolCreation {
        switch (type) {
            case 'resident':
                return new ContractPayoutToolCreation(payoutTool.value.currency, contractID, uuid(), new PayoutToolDetailsBankAccount(payoutTool.value.bankAccount));
            case 'nonresident':
                return new ContractPayoutToolCreation(payoutTool.value.currency, contractID, uuid(), {
                    number: payoutTool.value.bankAccount.number,
                    iban: payoutTool.value.bankAccount.iban,
                    bankDetails: this.getPrefixedWithoutPrefix(payoutTool.value.bankAccount, 'bankDetails'),
                    correspondentBankAccount: this.getPrefixedWithoutPrefix(payoutTool.value.bankAccount, 'correspondentBankAccount')
                } as any);
        }
    }

    private getPrefixedWithoutPrefix(params: object, prefix: string = '') {
        const result: object = {};
        for (const name of Object.keys(params)) {
            if (name.indexOf(prefix) === 0) {
                result[camelCase(name.slice(prefix.length))] = params[name];
            }
        }
        return result;
    }
}
