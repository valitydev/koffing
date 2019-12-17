import { Injectable } from '@angular/core';

import { SearchInvoicesParams } from 'koffing/backend/requests/search-invoices-params';

@Injectable()
export class InvoicesService {
    public toSearchParams(
        limit: number,
        continuationToken: string,
        formParams: any
    ): SearchInvoicesParams {
        const result = new SearchInvoicesParams();
        result.limit = limit;
        result.continuationToken = continuationToken;
        result.fromTime = formParams.from;
        result.toTime = formParams.to;
        result.invoiceID = formParams.invoiceID;
        result.invoiceStatus = formParams.invoiceStatus;
        result.paymentID = formParams.invoicesWithPayments ? '1' : '';
        result.paymentStatus = formParams.paymentStatus;
        result.paymentMethod = formParams.paymentMethod;
        result.paymentFlow = formParams.paymentFlow;
        result.payerIP = formParams.ip;
        result.payerEmail = formParams.email;
        result.payerFingerprint = formParams.fingerprint;
        result.first6 = formParams.first6;
        result.last4 = formParams.last4;
        result.rrn = formParams.rrn;
        result.customerID = formParams.customerID;
        result.bankCardTokenProvider = formParams.bankCardTokenProvider;
        return result;
    }
}
