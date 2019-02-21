import { Component, OnInit } from '@angular/core';

import { DepositService } from './deposit.service';
import { Deposit } from 'koffing/backend/wapi/model/deposit';

@Component({
    templateUrl: 'deposit.component.pug',
    providers: [DepositService]
})
export class DepositComponent implements OnInit {
    public deposit: Deposit;

    public depositNotFound: boolean = false;

    constructor(private depositService: DepositService) {}

    public ngOnInit() {
        this.depositService.depositSubject.subscribe(
            (deposit: Deposit) => (this.deposit = deposit),
            () => (this.depositNotFound = true)
        );
    }

    public back() {
        this.depositService.back();
    }
}
