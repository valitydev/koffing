import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

import { Withdrawal } from 'koffing/backend';
import { WithdrawalStatus } from 'koffing/withdrawals/withdrawal-status';

@Component({
    selector: 'kof-withdrawal-search-result',
    templateUrl: 'search-result.component.pug'
})
export class SearchResultComponent implements OnInit {
    @Input()
    public withdrawals: Observable<Withdrawal[]>;

    private shopID: string;

    constructor(private router: Router, private route: ActivatedRoute) {}

    public ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.shopID = params['shopID'];
        });
    }

    public getLabelClass(status: string) {
        return {
            'label-success': status === WithdrawalStatus.Succeeded,
            'label-danger': status === WithdrawalStatus.Failed,
            'label-warning': status === WithdrawalStatus.Pending
        };
    }

    public gotToWithdrawalDetails(withdrawalID: string) {
        this.router.navigate(['shop', this.shopID, 'withdrawal', withdrawalID]);
    }
}
