import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { SearchService } from 'koffing/backend/search.service';
import { Wallet } from 'koffing/backend';

@Component({
    selector: 'kof-wallets-table',
    templateUrl: 'wallets-table.component.pug',
    providers: [SearchService]
})
export class WalletsTableComponent implements OnInit {

    public page: number = 0;
    public limit: number = 10;
    public wallets: Subject<Wallet[]> = new Subject();

    private continuationTokens: string[] = [];

    constructor(private searchService: SearchService) {
    }

    public ngOnInit() {
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
        this.searchService.searchWallets({continuationToken, limit: this.limit}).subscribe((searchResult) => {
            this.continuationTokens[this.page + 1] = searchResult.continuationToken;
            this.wallets.next(searchResult.result);
        });
    }
}
