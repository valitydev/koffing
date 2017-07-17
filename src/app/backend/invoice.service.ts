import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { CreateInvoiceParams } from './requests/create-invoice-request';
import { Invoice } from './model/invoice';
import { InvoiceAccessToken } from './model/invoice-access-token';

@Injectable()
export class InvoiceService {

    private endpoint = `${this.config.capiUrl}/processing/invoices`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) {}

    public createInvoice(params: CreateInvoiceParams): Observable<Invoice> {
        return this.http.post(this.endpoint, params).map(res => res.json());
    }

    public createInvoiceAccessToken(invoiceID: string): Observable<InvoiceAccessToken> {
        return this.http.post(`${this.endpoint}/${invoiceID}/access_tokens`, {}).map(res => res.json());
    }
}
