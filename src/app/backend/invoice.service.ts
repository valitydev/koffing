import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import { InvoiceParams } from './requests';
import { InvoiceAndToken, InvoiceAccessToken, PaymentMethod } from './model';

@Injectable()
export class InvoiceService {

    private endpoint = `${this.config.capiUrl}/processing/invoices`;

    constructor(
        private http: KoffingHttp,
        private config: ConfigService
    ) {}

    public createInvoice(params: InvoiceParams): Observable<InvoiceAndToken> {
        return this.http.post(this.endpoint, params)
            .map(res => res.json());
    }

    public createInvoiceAccessToken(invoiceID: string): Observable<InvoiceAccessToken> {
        return this.http.post(`${this.endpoint}/${invoiceID}/access-tokens`, {})
            .map((res) => res.json());
    }

    public capturePayment(invoiceID: string, paymentID: string, reason: string): Observable<void> {
        return this.http.post(`${this.endpoint}/${invoiceID}/payments/${paymentID}/capture`, {reason})
            .map((res) => null);
    }

    public cancelPayment(invoiceID: string, paymentID: string, reason: string): Observable<void> {
        return this.http.post(`${this.endpoint}/${invoiceID}/payments/${paymentID}/cancel`, {reason})
            .map((res) => null);
    }

    public refundPayment(invoiceID: string, paymentID: string, reason: string): Observable<void> {
        return this.http.post(`${this.endpoint}/${invoiceID}/payments/${paymentID}/refunds`, {reason})
            .map((res) => null);
    }
    
    public getInvoicePaymentMethods(invoiceID: string): Observable<PaymentMethod[]> {
        return this.http.get(`${this.endpoint}/${invoiceID}/payment-methods`)
            .map(res => res.json());
    }
}
