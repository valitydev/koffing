import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WalletTableItem } from './wallet-table-item';
import { Wallet } from 'koffing/backend';
import { WalletService } from 'koffing/backend/wallet.service';

@Component({
    selector: 'kof-wallet-search-result',
    templateUrl: 'search-result.component.pug',
    styleUrls: ['search-result.component.less'],
    providers: [WalletService]
})
export class SearchResultComponent implements OnInit {
    public walletTableItems: WalletTableItem[] = [];
    public isLoading = false;

    @Input()
    private searchWalletsResult: Observable<Wallet[]>;

    constructor(private walletService: WalletService) {}

    public ngOnInit() {
        this.searchWalletsResult.subscribe(wallets => {
            this.walletTableItems = [];
            this.isLoading = true;
            wallets.forEach(wallet => {
                this.walletService.getWalletAccount(wallet.id).subscribe(account => {
                    this.walletTableItems.push({
                        ...wallet,
                        account
                    });
                    if (this.walletTableItems.length === wallets.length) {
                        this.isLoading = false;
                    }
                });
            });
        });
    }

    public getLabelClass(status: boolean) {
        return status ? 'label-danger' : 'label-success';
    }

    public getStatus(status: boolean) {
        return status ? 'Заблокирован' : 'Активен';
    }
}
