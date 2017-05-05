import { SearchInvoicesParams } from 'koffing/backend/requests/search-invoices-request';
import { FormSearchParams } from 'koffing/analytics/invoices/search-form/form-search-params';

export class InvoicesService {

    public static toSearchParams(limit: number, offset: number, formParams: FormSearchParams): SearchInvoicesParams {
        const result = new SearchInvoicesParams();
        result.limit = limit;
        result.offset = offset;
        result.fromTime = formParams.from;
        result.toTime = formParams.to;
        result.invoiceID = formParams.invoiceID;
        result.invoiceStatus = formParams.invoiceStatus;
        result.paymentID = formParams.paymentID;
        result.paymentStatus = formParams.paymentStatus;
        result.payerIP = formParams.ip;
        result.payerEmail = formParams.email;
        result.payerFingerprint = formParams.fingerprint;
        result.cardNumberMask = formParams.cardNumberMask;
        return result;
    }
}
