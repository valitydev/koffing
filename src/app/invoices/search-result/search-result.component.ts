import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Invoice } from 'koffing/backend/model/invoice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'kof-search-result',
    templateUrl: 'search-result.component.pug'
})
export class SearchResultComponent implements OnInit {
    @Input()
    public invoices: Observable<Invoice[]>;

    private shopID: string;

    constructor(private router: Router, private route: ActivatedRoute) {}

    public ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.shopID = params['shopID'];
        });
    }

    public getLabelClass(status: string) {
        return {
            'label-success': status === 'paid',
            'label-danger': status === 'cancelled',
            'label-warning': status === 'unpaid'
        };
    }

    public gotToInvoiceDetails(invoiceID: string) {
        this.router.navigate(['shop', this.shopID, 'invoice', invoiceID]);
    }
}
