import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentRefundService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public initForm(amount: number, availableAmount: number = 0): FormGroup {
        return this.fb.group({
            amount: [amount / 100, [
                Validators.required,
                Validators.min(10), // TODO: минимальная сумма рефанда?
                Validators.max(amount / 100),
                Validators.max( availableAmount / 100),
                Validators.pattern(/^\d+$/)]
            ],
            reason: ['']
        });
    }
}
