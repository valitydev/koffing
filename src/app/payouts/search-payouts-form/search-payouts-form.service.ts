import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { mapValues, isEqual } from 'lodash';

@Injectable()
export class SearchPayoutsFormService {

    public form: FormGroup;
    private shopID: string;
    private defaultValues = {
        from: moment().subtract(1, 'month').startOf('day').toDate(),
        to: moment().endOf('day').toDate(),
        payoutID: ''
    };

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.form = this.initForm();
        this.route.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
        this.route.queryParams.subscribe((queryParams) => this.updateFormValue(queryParams));
        this.form.valueChanges.subscribe((values) => this.updateQueryParams(values));
    }

    public initForm(): FormGroup {
        return this.fb.group({
            from: [this.defaultValues.from, Validators.required],
            to: [this.defaultValues.to, Validators.required],
            payoutID: this.defaultValues.payoutID
        });
    }

    private updateFormValue(queryParams: Params) {
        if (isEqual(queryParams, {})) {
            this.updateQueryParams(this.defaultValues);
        } else {
            this.form.patchValue(this.queryParamsToFormValue(queryParams));
        }
    }

    private updateQueryParams(value: any) {
        const queryParams = this.formValueToQueryParams(value);
        this.router.navigate(['shop', this.shopID, 'payouts'], {queryParams});
    }

    private formValueToQueryParams(formValue: any): Params {
        const mapped = mapValues(formValue, (value) => isEqual(value, '') ? null : value);
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
            from: moment(params.from).startOf('day').toDate(),
            to: moment(params.to).endOf('day').toDate()
        };
    }
}
