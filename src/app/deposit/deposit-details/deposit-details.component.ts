import { Component, Input } from '@angular/core';

import { DepositStatus, Deposit } from 'koffing/backend/wapi/model/deposit';

@Component({
    selector: 'kof-deposit-details',
    templateUrl: 'deposit-details.component.pug'
})
export class DepositDetailsComponent {
    @Input()
    public deposit: Deposit;

    public getLabelClass(status: DepositStatus) {
        return {
            'label-success': status === DepositStatus.Succeeded,
            'label-danger': status === DepositStatus.Failed,
            'label-warning': status === DepositStatus.Pending
        };
    }
}
