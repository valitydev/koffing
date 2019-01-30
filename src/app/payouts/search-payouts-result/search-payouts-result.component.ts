import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Payout } from 'koffing/backend';
import { PayoutTableItem } from '../payout-table-item';

@Component({
    selector: 'kof-search-payouts-result',
    templateUrl: 'search-payouts-result.component.pug'
})
export class SearchPayoutsResultComponent implements OnInit {
    @Input()
    public payouts: Observable<Payout[]>;

    public payoutListItems: PayoutTableItem[];

    private shopID: string;

    constructor(private route: ActivatedRoute) {}

    public ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.shopID = params['shopID'];
            this.prepareTableItems();
        });
    }

    public togglePayoutDetailsPanel(item: PayoutTableItem) {
        item.visible = !item.visible;
    }

    private prepareTableItems() {
        this.payouts.subscribe(payouts => {
            this.payoutListItems = payouts.map(payout => ({
                visible: false,
                payout
            }));
        });
    }
}
