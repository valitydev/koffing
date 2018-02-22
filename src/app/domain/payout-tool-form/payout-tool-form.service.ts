import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';

import { PayoutToolDetailsBankAccount, ContractPayoutToolCreation, PayoutToolDetailsInternationalBankAccount } from 'koffing/backend';
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
            bankAccount: this.bankAccountFormService.initForm(type)
        });
    }

    public toPayoutToolCreation(contractID: string, payoutTool: FormGroup, type: string): ContractPayoutToolCreation {
        switch (type) {
            case 'resident':
                return new ContractPayoutToolCreation(contractID, uuid(), new PayoutToolDetailsBankAccount(payoutTool.value.bankAccount));
            case 'nonresident':
                return new ContractPayoutToolCreation(contractID, uuid(), new PayoutToolDetailsInternationalBankAccount(payoutTool.value.bankAccount));
        }
    }
}
