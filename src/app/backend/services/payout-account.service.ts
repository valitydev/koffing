import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';
import { PayoutAccount } from '../classes/payout-account.class';

@Injectable()
export class PayoutAccountService {

    private payoutAccountsUrl: string = `${this.config.capiUrl}/processing/payout_accounts`;

    constructor(private http: Http, private config: ConfigService) {}

    public getPayoutAccounts(): Promise<PayoutAccount[]> {
        return this.http.get(this.payoutAccountsUrl)
            .toPromise()
            .then(response => response.json() as PayoutAccount[]);
    }

    public createPayoutAccount(payoutAccount: PayoutAccount): Promise<any> {
        const params = {
            currency: payoutAccount.currency,
            tool: payoutAccount.tool
        };
        return this.http.post(this.payoutAccountsUrl, params)
            .toPromise()
            .then(response => response.json());
    }
}
