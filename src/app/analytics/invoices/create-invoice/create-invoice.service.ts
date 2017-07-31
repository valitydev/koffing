import { round, map } from 'lodash';
import * as moment from 'moment';

import { InvoiceParamsAll } from 'koffing/backend/requests/invoice-params-all';
import { INVOICE_TYPES } from '../../invoice-form/invoice-types';
import { Product } from '../../invoice-form/product';

export class CreateInvoiceService {

    public static toInvoiceParams(formValue: any, shopID: string): InvoiceParamsAll {
        const params = new InvoiceParamsAll();
        params.shopID = shopID;
        params.product = formValue.product;
        params.currency = 'RUB';
        params.dueDate = moment(formValue.dueDate).utc().format();
        params.description = formValue.description;
        if (formValue.selectedInvoiceType === INVOICE_TYPES.fixed) {
            params.amount = this.toMinor(formValue.amount);
            params.metadata = {};
        } else if (formValue.selectedInvoiceType === INVOICE_TYPES.cart) {
            params.amount = this.toMinor(formValue.cartAmount);
            params.metadata = {
                items: map(formValue.cart, (product: Product) => {
                    product.price = this.toMinor(product.price);
                    return product;
                })
            };
        }
        return params;
    }

    private static toMinor(value: number): number {
        return round(value * 100);
    }
}
