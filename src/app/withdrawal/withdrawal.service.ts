import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { isUndefined } from 'lodash';

import { SearchService } from 'koffing/backend/search.service';
import { Withdrawal } from 'koffing/backend';

@Injectable()
export class WithdrawalService {

    public withdrawalSubject: Subject<Withdrawal> = new Subject();

    private withdrawal: Withdrawal;

    private shopID: string;

    constructor(private searchService: SearchService,
                private route: ActivatedRoute,
                private router: Router) {
        Observable.combineLatest(this.route.parent.params, this.route.params).subscribe((result) => {
            this.shopID = result[0].shopID;
            this.searchWithdrawal(result[1].withdrawalID);
        });
    }

    public back() {
        this.router.navigate(['shop', this.shopID, 'wallets']);
    }

    private searchWithdrawal(withdrawalID: string) {
        const searchRetries = 20;
        this.searchService.searchWalletWithdrawal(withdrawalID).repeatWhen((notifications) =>
            notifications
                .delay(1000)
                .takeWhile((value, retries) => {
                    if (retries === searchRetries) {
                        this.withdrawalSubject.error({message: 'Withdrawal not found'});
                    }
                    return isUndefined(this.withdrawal) && retries < searchRetries;
                }))
            .subscribe((searchResult: Withdrawal) => {
                if (searchResult) {
                    this.withdrawal = searchResult;
                    this.withdrawalSubject.next(this.withdrawal);
                    this.withdrawalSubject.complete();
                }
            });
    }
}
