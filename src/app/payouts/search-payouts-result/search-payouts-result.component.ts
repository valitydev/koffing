import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Payout, PAYOUT_STATUS } from 'koffing/backend';

@Component({
    selector: 'kof-search-payouts-result',
    templateUrl: 'search-payouts-result.component.pug'
})
export class SearchPayoutsResultComponent implements OnInit {

    @Input()
    public payouts: Observable<Payout[]>;

    private shopID: string;

    constructor(private route: ActivatedRoute) { }

    public ngOnInit() {
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
    }

    public getPayoutLabel(payoutStatus: string) {
        if (payoutStatus === PAYOUT_STATUS.confirmed) {
            return 'label-success';
        } else if (payoutStatus === PAYOUT_STATUS.paid || payoutStatus === PAYOUT_STATUS.cancelled) {
            return 'label-warning';
        } else if (payoutStatus === PAYOUT_STATUS.unpaid) {
            return 'label-danger';
        }
    }
}
