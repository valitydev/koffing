import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CapiHttp } from 'koffing/backend/capi-http.service';
import { ConfigService } from './config.service';
import { InvoiceAndToken } from './model/invoice-and-token';
import { InvoiceAccessToken } from './model/invoice-access-token';
import { InvoiceParams } from './requests/invoice-params';
import { PaymentMethod } from 'koffing/backend/model/payment-method/payment-method';

@Injectable()
export class InvoiceService {

    private endpoint = `${this.config.capiUrl}/processing/invoices`;

    constructor(
        private http: CapiHttp,
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
