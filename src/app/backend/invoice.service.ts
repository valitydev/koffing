import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { InvoiceAndToken } from './model/invoice-and-token';
import { InvoiceAccessToken } from './model/invoice-access-token';
import { InvoiceParams } from './requests/invoice-params';

@Injectable()
export class InvoiceService {

    private endpoint = `${this.config.capiUrl}/processing/invoices`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    public createInvoice(params: InvoiceParams): Observable<InvoiceAndToken> {
        return this.http.post(this.endpoint, params).map(res => res.json());
    }

    public createInvoiceAccessToken(invoiceID: string): Observable<InvoiceAccessToken> {
        return this.http.post(`${this.endpoint}/${invoiceID}/access_tokens`, {}).map(res => res.json());
    }
}
