import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { SearchService } from 'koffing/backend/search.service';
import { PayoutsService } from 'koffing/payouts/payouts.service';
import { SearchPayoutsFormService } from './search-payouts-form/search-payouts-form.service';
import { Payout } from 'koffing/backend/model/payout';
import { PAYOUT_STATUS } from 'koffing/backend';

@Component({
    templateUrl: 'payouts.component.pug',
    styleUrls: ['payouts.component.less'],
    providers: [PayoutsService, SearchPayoutsFormService],
    encapsulation: ViewEncapsulation.None
})
export class PayoutsComponent implements OnInit {

    public payouts: Subject<Payout[]> = new Subject();
    public shopID: string;
    public totalCount: number;
    private limit: number = 40;
    private offset: number = 0;
    private searchForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private searchService: SearchService,
                private payoutsService: PayoutsService,
                private searchPayoutsFormService: SearchPayoutsFormService) {
    }

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
        const paidParams = this.payoutsService.toSearchParams(this.limit, this.offset, this.searchForm.value);
        paidParams.payoutStatus = PAYOUT_STATUS.paid;
        const confirmedParams = this.payoutsService.toSearchParams(this.limit, this.offset, this.searchForm.value);
        confirmedParams.payoutStatus = PAYOUT_STATUS.confirmed;
        Observable.forkJoin(
            this.searchService.searchPayouts(this.shopID, paidParams),
            this.searchService.searchPayouts(this.shopID, confirmedParams)
        ).map((response) => {
            const paid = response[0].result;
            const confirmed = response[1].result;
            return {
                totalCount: response[0].totalCount + response[1].totalCount,
                result: paid.concat(confirmed)
                    .sort((a, b) => moment(a.createdAt).isSameOrBefore(moment(b.createdAt)) ? 1 : -1)
            };
        }).subscribe((mapped) => {
            this.totalCount = mapped.totalCount;
            this.payouts.next(mapped.result);
        });
    }
}
