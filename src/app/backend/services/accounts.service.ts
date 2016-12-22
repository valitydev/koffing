import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';

@Injectable()
export class AccountService {

    constructor(private http: Http, private config: ConfigService) { }

    public getShopAccounts(shopID: string): Promise<any> {
        return this.http.get(`${this.config.capiUrl}/processing/shops/${shopID}/accounts`)
            .toPromise()
            .then(response => response.json());
    }

    public getShopAccountDetails(shopID: string, accountID: string): Promise<any> {
        return this.http.get(`${this.config.capiUrl}/processing/shops/${shopID}/accounts/${accountID}`)
            .toPromise()
            .then(response => response.json());
    }
}
