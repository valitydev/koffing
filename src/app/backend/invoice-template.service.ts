import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CapiHttp } from 'koffing/backend/capi-http.service';
import { ConfigService } from './config.service';
import { InvoiceTemplate } from 'koffing/backend/model';
import { InvoiceTemplateAndToken } from 'koffing/backend/model';
import { InvoiceTemplateParams } from './requests/invoice-template-params';

@Injectable()
export class InvoiceTemplateService {

    private invoiceTemplatesUrl: string = `${this.config.capiUrl}/processing/invoice-templates`;

    constructor(
        private http: CapiHttp,
        private config: ConfigService
    ) {}

    public getInvoiceTemplateByID(invoiceTemplateID: string): Observable<InvoiceTemplate> {
        return this.http.get(`${this.invoiceTemplatesUrl}/${invoiceTemplateID}`).map(res => res.json());
    }

    public createInvoiceTemplate(params: InvoiceTemplateParams): Observable<InvoiceTemplateAndToken> {
        return this.http.post(this.invoiceTemplatesUrl, params).map(res => res.json());
    }

    public updateInvoiceTemplate(invoiceTemplateID: string, params: InvoiceTemplateParams): Observable<InvoiceTemplate> {
        return this.http.put(`${this.invoiceTemplatesUrl}/${invoiceTemplateID}`, params).map(res => res.json());
    }

    public deleteInvoiceTemplate(invoiceTemplateID: string): Observable<any> {
        return this.http.delete(`${this.invoiceTemplatesUrl}/${invoiceTemplateID}`).map(res => res.json());
    }
}
