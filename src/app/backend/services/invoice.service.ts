import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ConfigService } from './config.service';

@Injectable()
export class InvoiceService {

    constructor(private http: Http, private config: ConfigService) { }

    public getInvoices(shopID: string, request: any): Promise<any> {
        let params = new URLSearchParams();
        params.set('fromTime', request.fromTime);
        params.set('toTime', request.toTime);
        params.set('limit', request.limit);
        params.set('offset', request.offset);
        if (request.invoiceID) {
            params.set('invoiceID', request.invoiceID);
        }
        if (request.status) {
            params.set('status', request.status);
        }
        return this.http.get(`${this.config.capiUrl}/analytics/shops/${shopID}/invoices`, {
            search: params
        }).toPromise().then(response => response.json());
    }
}
