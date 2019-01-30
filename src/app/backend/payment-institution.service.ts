import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import { PaymentInstitution } from 'koffing/backend';

@Injectable()
export class PaymentInstitutionService {
    constructor(private http: KoffingHttp, private config: ConfigService) {}

    public getPaymentInstitutions(): Observable<PaymentInstitution[]> {
        return this.http.get(this.getEndpoint()).map(res => res.json());
    }

    private getEndpoint(): string {
        return `${this.config.capiUrl}/processing/payment-institutions`;
    }
}
