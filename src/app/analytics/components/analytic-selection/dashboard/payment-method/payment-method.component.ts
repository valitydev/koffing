import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as _ from 'lodash';

import { CHART_OPTIONS } from './../chart-options.const';

@Component({
    selector: 'kof-payment-method',
    templateUrl: './payment-method.component.pug'
})
export class PaymentMethodComponent implements OnInit, OnChanges {

    @Input()
    public chartData: any;
    public labels: string[] | any[];
    public data: number[] = [];
    public type: string = 'doughnut';
    public options: any = {
        animation: false,
        legend: {
            display: true,
            position: 'left'
        }
    };
    public chartColors = [CHART_OPTIONS.DOUGHNUT.COLORS];

    private isLoading: boolean;

    public ngOnInit() {
        this.isLoading = true;
    }

    public ngOnChanges() {
        let grouped: any;
        let paymentSystem: any;
        let data: any[];
        if (this.chartData) {
            this.isLoading = false;

            grouped = _.groupBy(this.chartData, 'paymentSystem');
            paymentSystem = _.keys(grouped);
            data = [];
            _.forEach(paymentSystem, system => data.push(
                _.chain(grouped[system])
                    .reduce(
                        (acc: any, item: any) => acc + item.totalCount, 0
                    )
                    .value()
            ));
            this.labels = _.map(paymentSystem, system => {
                let result = system;

                if (system === 'visa') {
                    result = 'Visa';
                } else if (system === 'mastercard' || system === 'master_card' ) {
                    result = 'Master Card';
                } else if (system === 'nspkmir') {
                    result = 'Mir';
                }

                return result;
            });
            this.data = data;
        }
    }
}
