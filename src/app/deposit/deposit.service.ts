import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { isUndefined } from 'lodash';

import { SearchService } from 'koffing/backend/search.service';
import { Deposit } from 'koffing/backend/wapi/model/deposit';

@Injectable()
export class DepositService {
    public depositSubject: Subject<Deposit> = new Subject();

    private deposit: Deposit;

    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        Observable.combineLatest(this.route.parent.params, this.route.params).subscribe(result => {
            this.searchDeposit(result[1].depositID);
        });
    }

    public back() {
        this.router.navigate(['wallets', 'deposits']);
    }

    private searchDeposit(depositID: string) {
        const searchRetries = 20;
        this.searchService
            .searchWalletDeposits({ limit: 1, depositID })
            .repeatWhen(notifications =>
                notifications.delay(1000).takeWhile((value, retries) => {
                    if (retries === searchRetries) {
                        this.depositSubject.error({ message: 'Deposit not found' });
                    }
                    return isUndefined(this.deposit) && retries < searchRetries;
                })
            )
            .subscribe(searchResult => {
                if (searchResult) {
                    this.deposit = searchResult[0];
                    this.depositSubject.next(this.deposit);
                    this.depositSubject.complete();
                }
            });
    }
}
