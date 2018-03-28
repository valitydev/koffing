import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Invoice } from 'koffing/backend/model/invoice';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { CreateInvoiceService } from './create-invoice.service';
import { InvoiceFormService } from 'koffing/invoices/invoice-form/invoice-form.service';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'koffing/backend/shop.service';

@Component({
    selector: 'kof-create-invoice',
    templateUrl: 'create-invoice.component.pug',
    encapsulation: ViewEncapsulation.None
})
export class CreateInvoiceComponent implements OnInit {

    @Input()
    public shopID: string;

    @Output()
    public onCreate: EventEmitter<Invoice> = new EventEmitter();

    public invoiceForm: FormGroup;

    constructor(
        private invoiceService: InvoiceService,
        private invoiceFormService: InvoiceFormService,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) { }

    public ngOnInit() {
        this.invoiceForm = this.invoiceFormService.form;
        this.setDefaultFormValues();
    }

    public createInvoice() {
        const params = CreateInvoiceService.toInvoiceParams(this.invoiceForm.value, this.shopID);
        this.invoiceService.createInvoice(params).subscribe((invoiceAndToken) => {
            this.setDefaultFormValues();
            this.onCreate.emit(invoiceAndToken.invoice);
        });
    }

    public setDefaultFormValues() {
        this.route.parent.params.switchMap((params) =>
            this.shopService.getShopByID(params.shopID)).subscribe((shop) => {
            this.invoiceFormService.setDefaultValues({currency: shop.account.currency});
        });

    }
}
