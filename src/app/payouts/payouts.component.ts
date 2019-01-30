import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { SearchService } from 'koffing/backend/search.service';
import { PayoutsService } from 'koffing/payouts/payouts.service';
import { SearchPayoutsFormService } from './search-payouts-form/search-payouts-form.service';
import { Payout } from 'koffing/backend/model/payout';
import { WalletPayoutFormService } from './ wallet-payout-form/wallet-payout-form.service';

@Component({
    templateUrl: 'payouts.component.pug',
    styleUrls: ['payouts.component.less'],
    providers: [PayoutsService, SearchPayoutsFormService, WalletPayoutFormService],
    encapsulation: ViewEncapsulation.None
})
export class PayoutsComponent implements OnInit {
    public payouts: Subject<Payout[]> = new Subject();
    public shopID: string;
    public totalCount: number;
    private limit: number = 40;
    private offset: number = 0;
    private searchForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private searchService: SearchService,
        private payoutsService: PayoutsService,
        private searchPayoutsFormService: SearchPayoutsFormService
    ) {}

    public ngOnInit() {
        this.searchForm = this.searchPayoutsFormService.form;
        this.route.parent.params.subscribe((params: Params) => {
            this.shopID = params['shopID'];
            this.loadPayouts();
        });
    }

    public searchPayouts() {
        this.offset = 0;
        this.loadPayouts();
    }

    public onChangePage(offset: number) {
        this.offset = offset;
        this.loadPayouts();
    }

    public loadPayouts() {
        const params = this.payoutsService.toSearchParams(
            this.limit,
            this.offset,
            this.searchForm.value
        );
        this.searchService.searchPayouts(this.shopID, params).subscribe(response => {
            this.totalCount = response.totalCount;
            this.payouts.next(response.result);
        });
    }
}
