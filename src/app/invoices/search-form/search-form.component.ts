import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map } from 'lodash';

import { SelectItem } from 'koffing/common/select/select-item';
import { INVOICE_STATUS_LABEL } from '../invoice-status-label';
import { PAYMENT_STATUS_LABEL } from '../payment-status-label';
import { PAYMENT_METHOD_LABEL } from '../payment-method-label';
import { PAYMENT_FLOW_LABEL } from '../payment-flow-label';
import { SearchFormService } from './search-form.service';
import { TOKEN_PROVIDER_LABEL } from '../token-provider-label';

@Component({
    selector: 'kof-search-form',
    templateUrl: 'search-form.component.pug',
    styleUrls: ['search-form.component.less'],
    animations: [
        trigger('flyInOut', [
            state(
                'in',
                style({
                    opacity: 1
                })
            ),
            transition('void => *', [
                style({
                    opacity: 0
                }),
                animate('0.1s ease-in')
            ]),
            transition('* => void', [
                animate(
                    '0.1s ease-out',
                    style({
                        opacity: 0
                    })
                )
            ])
        ])
    ]
})
export class SearchFormComponent implements OnInit {
    @Output()
    public onSearch: EventEmitter<void> = new EventEmitter<void>();

    public searchForm: FormGroup;
    public invoiceStatuses: SelectItem[];
    public paymentStatuses: SelectItem[];
    public paymentMethods: SelectItem[];
    public tokenProviders: SelectItem[];
    public paymentFlows: SelectItem[];
    public additionalParamsVisible: boolean;

    constructor(private searchFormService: SearchFormService) {}

    public ngOnInit() {
        this.invoiceStatuses = map(INVOICE_STATUS_LABEL, (name, key) => new SelectItem(key, name));
        this.paymentStatuses = map(PAYMENT_STATUS_LABEL, (name, key) => new SelectItem(key, name));
        this.paymentMethods = map(PAYMENT_METHOD_LABEL, (name, key) => new SelectItem(key, name));
        this.tokenProviders = map(TOKEN_PROVIDER_LABEL, (name, key) => new SelectItem(key, name));
        this.paymentFlows = map(PAYMENT_FLOW_LABEL, (name, key) => new SelectItem(key, name));

        this.searchForm = this.searchFormService.searchForm;
        this.searchForm.valueChanges
            .filter(value => this.searchForm.status === 'VALID')
            .debounceTime(300)
            .subscribe(() => this.onSearch.emit());
        this.additionalParamsVisible = this.searchFormService.hasFormAdditionalParams();
    }

    public reset() {
        this.searchFormService.reset();
        this.onSearch.emit();
    }

    public toggleAdditionalParamsVisible() {
        this.additionalParamsVisible = !this.additionalParamsVisible;
    }
}
