import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from 'koffing/backend/services/config.service';
import { CreateInvoiceParams } from 'koffing/backend/requests/create-invoice-request';
import { Invoice } from 'koffing/backend/model/invoice';

@Injectable()
export class InvoiceService {

    constructor(private http: Http,
                private config: ConfigService) {
    }

    public createInvoice(params: CreateInvoiceParams): Observable<Invoice> {
        return this.http.post(`${this.config.capiUrl}/processing/invoices`, params).map(res => res.json());
    }
}
