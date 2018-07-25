import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { toDisplayAmount } from 'koffing/common/amount-utils';

@Injectable()
export class PaymentRefundService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public initForm(amount: number, availableAmount: number = 0): FormGroup {
        const displayAmount = toDisplayAmount(amount);
        const displayAvailableAmount = toDisplayAmount(availableAmount);
        return this.fb.group({
            amount: [
                displayAmount, [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(displayAmount),
                    Validators.max(displayAvailableAmount),
                    Validators.pattern(/^\d+(\.\d{1,2})?$/)
                ]
            ],
            reason: ['']
        });
    }
}
