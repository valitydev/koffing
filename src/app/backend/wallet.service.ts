import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import { WalletAccount } from 'koffing/backend/model';

@Injectable()
export class WalletService {

    private endpoint = `${this.config.wapiUrl}/wallets`;

    constructor(
        private http: KoffingHttp,
        private config: ConfigService
    ) {}

    public getWalletAccount(walletID: string): Observable<WalletAccount> {
        return this.http.get(`${this.endpoint}/${walletID}/account`)
            .map(res => res.json());
    }
}
