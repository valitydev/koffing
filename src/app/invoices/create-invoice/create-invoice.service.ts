import { map } from 'lodash';
import * as moment from 'moment';

import { InvoiceParams } from 'koffing/backend/requests/invoice-params';
import { InvoiceLine } from 'koffing/backend/model/invoice-cart/invoice-line';
import { InvoiceLineTaxVAT } from 'koffing/backend/model/invoice-cart/invoice-line-tax-vat';
import { CurrencyService } from 'koffing/common/currency.service';
import { Product } from '../invoice-form/product';

export class CreateInvoiceService {

    public static toInvoiceParams(formValue: any, shopID: string): InvoiceParams {
        const params = new InvoiceParams();
        params.shopID = shopID;
        params.product = formValue.product;
        params.currency = 'RUB';
        params.dueDate = moment(formValue.dueDate).utc().format();
        params.description = formValue.description;
        params.metadata = {};
        params.cart = map(formValue.cart, (product: Product) => {
            const invoiceLine = new InvoiceLine(product.product, product.quantity, CurrencyService.toMinor(product.price));
            if (product.tax) {
                invoiceLine.taxMode = new InvoiceLineTaxVAT(product.tax);
            }
            return invoiceLine;
        });
        return params;
    }
}
