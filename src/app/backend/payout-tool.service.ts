import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CapiHttp } from './capi-http.service';
import { ConfigService } from './config.service';
import { PayoutTool } from './model';

@Injectable()
export class PayoutToolService {

    constructor(
        private http: CapiHttp,
        private config: ConfigService
    ) { }

    public getPayoutTools(contractID: string): Observable<PayoutTool[]> {
        return this.http.get(this.getEndpoint(contractID)).map((res) => res.json());
    }

    public getPayoutToolByID(contractID: string, payoutToolID: string): Observable<PayoutTool> {
        return this.http.get(`${this.getEndpoint(contractID)}/${payoutToolID}`).map((res) => res.json());
    }

    private getEndpoint(contractID: string): string {
        return `${this.config.capiUrl}/processing/contracts/${contractID}/payout_tools`;
    }
}
