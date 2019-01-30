import { Component, OnInit } from '@angular/core';

import { Withdrawal } from 'koffing/backend';
import { WithdrawalService } from './withdrawal.service';

@Component({
    templateUrl: 'withdrawal.component.pug',
    providers: [WithdrawalService]
})
export class WithdrawalComponent implements OnInit {
    public withdrawal: Withdrawal;

    public withdrawalNotFound: boolean = false;

    constructor(private withdrawalService: WithdrawalService) {}

    public ngOnInit() {
        this.withdrawalService.withdrawalSubject.subscribe(
            (withdrawal: Withdrawal) => (this.withdrawal = withdrawal),
            () => (this.withdrawalNotFound = true)
        );
    }

    public back() {
        this.withdrawalService.back();
    }
}
