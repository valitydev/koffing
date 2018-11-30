import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WalletTableItem } from './wallet-table-item';
import { Wallet } from 'koffing/backend';
import { WalletService } from 'koffing/backend/wallet.service';

@Component({
    selector: 'kof-wallet-search-result',
    templateUrl: 'search-result.component.pug',
    providers: [WalletService]
})
export class SearchResultComponent implements OnInit {

    public walletTableItems: WalletTableItem[] = [];

    @Input()
    private searchWalletsResult: Observable<Wallet[]>;

    constructor(private walletService: WalletService) {
    }

    public ngOnInit() {
        this.searchWalletsResult.subscribe((wallets) => {
            this.walletTableItems = [];
            wallets.forEach((wallet) => {
                this.walletService.getWalletAccount(wallet.id).subscribe((account) => {
                    this.walletTableItems.push({
                        ...wallet,
                        account
                    });
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
