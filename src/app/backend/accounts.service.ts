import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { Account } from './model/account';

@Injectable()
export class AccountsService {

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    public getAccountByID(accountID: number): Observable<Account> {
        return this.http.get(`${this.config.capiUrl}/processing/accounts/${accountID}`).map(res => res.json());
    }
}
