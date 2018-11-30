import { Component, Input } from '@angular/core';

import { Withdrawal } from 'koffing/backend';
import { WithdrawalStatus } from 'koffing/wallets/withdrawal-status';

@Component({
    selector: 'kof-withdrawal-details',
    templateUrl: 'withdrawal-details.component.pug'
})
export class WithdrawalDetailsComponent {

    @Input()
    public withdrawal: Withdrawal;

    public getLabelClass(status: WithdrawalStatus) {
        return {
            'label-success': status === WithdrawalStatus.Succeeded,
            'label-danger': status === WithdrawalStatus.Failed,
            'label-warning': status === WithdrawalStatus.Pending
        };
    }
}
