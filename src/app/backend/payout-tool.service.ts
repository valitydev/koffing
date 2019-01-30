import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import { PayoutTool, Payout } from './model';
import { CreatePayoutParams } from './requests/create-payout-request';

@Injectable()
export class PayoutToolService {
    constructor(private http: KoffingHttp, private config: ConfigService) {}

    public getPayoutTools(contractID: string): Observable<PayoutTool[]> {
        return this.http.get(this.getEndpoint(contractID)).map(res => res.json());
    }

    public getPayoutToolByID(contractID: string, payoutToolID: string): Observable<PayoutTool> {
        return this.http
            .get(`${this.getEndpoint(contractID)}/${payoutToolID}`)
            .map(res => res.json());
    }

    public createPayout(body: CreatePayoutParams): Observable<Payout> {
        return this.http
            .post(`${this.config.capiUrl}/processing/payouts`, body)
            .map(res => res.json());
    }

    private getEndpoint(contractID: string): string {
        return `${this.config.capiUrl}/processing/contracts/${contractID}/payout_tools`;
    }
}
