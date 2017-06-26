import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

import { CreateInvoiceFormData } from './create-invoice-form-data';
import { InvoiceService } from 'koffing/backend/invoice.service';
import { Invoice } from 'koffing/backend/model/invoice';

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

    public formData: CreateInvoiceFormData;

    public minDueDate: Date = moment().toDate();

    constructor(private invoiceService: InvoiceService) {
    }

    public ngOnInit() {
        this.formData = this.createInstance();
    }

    public create() {
        const params = {
            shopID: Number(this.shopID),
            amount: this.formData.amount * 100,
            currency: 'RUB',
            metadata: {},
            dueDate: moment(this.formData.dueDate).utc().format(),
            product: this.formData.product,
            description: this.formData.description
        };
        this.invoiceService.createInvoice(params).subscribe((invoice) => {
            this.cancel();
            this.onCreate.emit(invoice);
        });
    }

    public cancel() {
        this.formData = this.createInstance();
    }

    private createInstance(): CreateInvoiceFormData {
        const result = new CreateInvoiceFormData();
        result.amount = 10;
        result.dueDate = moment().add(1, 'h').toDate();
        return result;
    }
}
