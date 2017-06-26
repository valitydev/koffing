import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Invoice } from 'koffing/backend/model/invoice';
import { InvoiceTableItem } from './invoice-table-item';
import { SearchResultService } from './search-result.service';
import { FormSearchParams } from 'koffing/analytics/invoices/search-form/form-search-params';

@Component({
    selector: 'kof-search-result',
    templateUrl: 'search-result.component.pug'
})
export class SearchResultComponent implements OnInit {

    @Input()
    public invoices: Observable<Invoice[]>;

    @Input()
    public searchParams: FormSearchParams;

    public invoiceTableItems: Observable<InvoiceTableItem[]>;

    public ngOnInit() {
        this.invoiceTableItems = this.invoices
            .map((invoices) => SearchResultService.toInvoiceTableItems(invoices))
            .do((invoices) => {
                if (invoices.length === 1) {
                    invoices[0].visible = true;
                }
            });
    }

    public getLabelClass(status: string) {
        return {
            'label-success': status === 'paid',
            'label-danger': status === 'cancelled',
            'label-warning': status === 'unpaid'
        };
    }

    public togglePaymentPanel(item: InvoiceTableItem) {
        item.visible = !item.visible;
    }
}
