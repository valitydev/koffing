import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';

import { PayoutToolDetailsBankAccount, ContractPayoutToolCreation } from 'koffing/backend';
import { BankAccountFormService } from '../bank-account-form/bank-account-form.service';

@Injectable()
export class PayoutToolFormService {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private bankAccountFormService: BankAccountFormService
    ) { }

    public initForm(): FormGroup {
        return this.fb.group({
            bankAccount: this.bankAccountFormService.initForm()
        });
    }

    public toPayoutToolCreation(contractID: string, payoutTool: FormGroup): ContractPayoutToolCreation {
        const payoutToolDetails = new PayoutToolDetailsBankAccount(payoutTool.value.bankAccount);
        return new ContractPayoutToolCreation(contractID, uuid(), payoutToolDetails);
    }
}
