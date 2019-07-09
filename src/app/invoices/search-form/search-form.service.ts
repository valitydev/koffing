import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { mapValues, isEqual, chain, keys, difference } from 'lodash';

@Injectable()
export class SearchFormService {
    public searchForm: FormGroup;

    private shopID: string;

    private defaultValues = {
        from: moment()
            .subtract(1, 'month')
            .startOf('day')
            .toDate(),
        to: moment()
            .endOf('day')
            .toDate()
    };

    private mainSearchFields = ['invoiceID', 'invoiceStatus', 'paymentStatus'];

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.searchForm = this.initForm();
        this.route.parent.params.subscribe(params => {
            this.shopID = params['shopID'];
        });
        this.route.queryParams.subscribe(queryParams => this.updateFormValue(queryParams));
        this.searchForm.valueChanges.subscribe(values => this.updateQueryParams(values));
    }

    public reset() {
        this.searchForm.reset(this.defaultValues);
    }

    public hasFormAdditionalParams(): boolean {
        const formFields = chain(this.searchForm.getRawValue())
            .map((value: string, key: string) => (isEqual(value, '') ? null : key))
            .filter(mapped => mapped !== null)
            .value();
        const defaultFields = keys(this.defaultValues);
        return difference(formFields, defaultFields, this.mainSearchFields).length > 0;
    }

    private updateFormValue(queryParams: Params) {
        if (isEqual(queryParams, {})) {
            this.updateQueryParams(this.defaultValues);
        } else {
            this.searchForm.patchValue(this.queryParamsToFormValue(queryParams));
        }
    }

    private updateQueryParams(value: any) {
        const queryParams = this.formValueToQueryParams(value);
        this.router.navigate(['shop', this.shopID, 'invoices'], { queryParams });
    }

    private initForm(): FormGroup {
        return this.fb.group({
            from: [this.defaultValues.from, Validators.required],
            to: [this.defaultValues.to, Validators.required],
            first6: ['', Validators.pattern(/^\d{6}$/)],
            last4: ['', Validators.pattern(/^\d{4}$/)],
            invoiceID: '',
            invoiceStatus: '',
            ip: '',
            email: '',
            paymentID: '',
            paymentStatus: '',
            paymentMethod: '',
            paymentFlow: '',
            fingerprint: '',
            customerID: '',
            bankCardTokenProvider: ''
        });
    }

    private formValueToQueryParams(formValue: any): Params {
        const mapped = mapValues(formValue, value => (isEqual(value, '') ? null : value));
        const urlDateFormat = 'YYYY-MM-DD';
        return {
            ...mapped,
            from: moment(formValue.from).format(urlDateFormat),
            to: moment(formValue.to).format(urlDateFormat)
        };
    }

    private queryParamsToFormValue(params: Params): any {
        return {
            ...params,
            from: moment(params.from)
                .startOf('day')
                .toDate(),
            to: moment(params.to)
                .endOf('day')
                .toDate()
        };
    }
}
