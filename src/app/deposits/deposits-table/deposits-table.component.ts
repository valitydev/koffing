import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { DepositsTableService } from './deposits-table.service';
import { SearchService } from 'koffing/backend/search.service';
import { Withdrawal } from 'koffing/backend';
import { SearchFormService } from './search-form/search-form.service';

@Component({
    selector: 'kof-wallets-deposits',
    templateUrl: 'deposits-table.component.pug',
    styleUrls: ['deposits-table.component.less'],
    providers: [DepositsTableService, SearchFormService]
})
export class DepositsTableComponent {
    public page: number = 0;
    public limit: number = 20;
    public deposits: Subject<Withdrawal[]> = new Subject();
    private continuationTokens: string[] = [];
    private formValue: any;

    constructor(
        private depositsTableService: DepositsTableService,
        private searchService: SearchService
    ) {}

    public reset() {
        this.continuationTokens = [];
        this.page = 0;
    }

    public onSearch(fromValue: any) {
        this.reset();
        this.formValue = fromValue;
        this.search();
    }

    public hasNext() {
        return !!this.continuationTokens[this.page + 1];
    }

    public onChangePage(num: number) {
        this.search(num);
    }

    private search(num: number = 0) {
        this.page += num;
        const continuationToken = this.continuationTokens[this.page];
        const request = this.depositsTableService.toSearchParams(
            this.limit,
            continuationToken,
            this.formValue
        );
        this.searchService.searchWalletWithdrawals(request).subscribe(response => {
            this.continuationTokens[this.page + 1] = response.continuationToken;
            this.deposits.next(response.result);
        });
    }
}
