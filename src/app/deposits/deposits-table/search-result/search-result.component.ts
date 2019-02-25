import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { DepositStatus, Deposit } from 'koffing/backend/wapi/model/deposit';

@Component({
    selector: 'kof-deposits-search-result',
    templateUrl: 'search-result.component.pug'
})
export class SearchResultComponent {
    @Input()
    public deposits: Observable<Deposit[]>;

    constructor(private router: Router) {}

    public getLabelClass(status: string) {
        return {
            'label-success': status === DepositStatus.Succeeded,
            'label-danger': status === DepositStatus.Failed,
            'label-warning': status === DepositStatus.Pending
        };
    }

    public gotToDepositDetails(depositID: string) {
        this.router.navigate(['wallets', 'deposits', depositID]);
    }
}
