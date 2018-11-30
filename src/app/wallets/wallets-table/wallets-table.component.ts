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
    public wallets: Subject<Wallet[]> = new Subject();

    constructor(private searchService: SearchService) {
    }

    public ngOnInit() {
        this.searchService.searchWallets({limit: 1000}).subscribe((searchResult) => {
            this.wallets.next(searchResult.result);
        });
    }
}
