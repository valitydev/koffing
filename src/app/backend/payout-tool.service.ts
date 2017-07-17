import { Injectable } from '@angular/core';
import { Http } from '@angular/http/src';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { PayoutTool } from './model/payout-tool/payout-tool';

@Injectable()
export class PayoutToolService {

    constructor(private http: Http,
                private config: ConfigService) {
    }

    public getPayoutTools(contractID: string): Observable<PayoutTool[]> {
        return this.http.get(this.getEndpoint(contractID)).map((res) => res.json());
    }

    public getPayoutToolByID(contractID: string, payoutToolID: string): Observable<PayoutTool> {
        return this.http.get(`${this.getEndpoint(contractID)}/${payoutToolID}`).map((res) => res.json());
    }

    private getEndpoint(contractID: string) {
        return `${this.config.capiUrl}/processing/contracts/${contractID}/payout_tools`;

    }
}
