import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PayoutAccount } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-create-payout-account',
    templateUrl: 'create-payout-account.component.pug'
})
export class CreatePayoutAccountComponent {

    @Input()
    public newPayoutAccount: PayoutAccount;

    @Output()
    public readyStateChange = new EventEmitter();

    private isOnceValid: boolean = false;

    public checkForm(form: any) {
        let emit = () => {
            this.readyStateChange.emit({
                payoutAccount: this.newPayoutAccount,
                valid: form.valid
            });
        };

        if (form.valid) {
            emit();
            this.isOnceValid = true;
        } else if (!form.valid && this.isOnceValid) {
            emit();
            this.isOnceValid = false;
        }
    }

    public hasError(field: any): boolean {
        return field.dirty && field.invalid;
    }
}
