import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CapiHttp } from './capi-http.service';
import { ConfigService } from './config.service';
import { Account } from './model';

@Injectable()
export class AccountsService {

    constructor(
        private http: CapiHttp,
        private config: ConfigService
    ) { }

    public getAccountByID(accountID: number): Observable<Account> {
        return this.http.get(`${this.config.capiUrl}/processing/accounts/${accountID}`).map(res => res.json());
    }
}
