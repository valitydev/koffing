import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { CHART_OPTIONS } from './../chart-options.const';

@Component({
    selector: 'kof-conversion',
    templateUrl: './conversion.component.pug'
})
export class ConversionComponent implements OnInit, OnChanges {

    @Input()
    public fromTime: any;
    @Input()
    public chartData: any;
    public labels: string[];
    public data: number[] | any[] = [];
    public type: string = 'line';
    public options: any = {
        animation: false,
        elements: {
            line: {
                tension: 0.2
            }
        },
        scales: {
            yAxes: [{
                stacked: true
            }],
            xAxes: [{
                ticks: {
                    fontSize: 11
                }
            }]
        },
        legend: {
            display: false
        }
    };
    public chartColors = [CHART_OPTIONS.LINE.COLORS];

    private isLoading: boolean;

    public ngOnInit() {
        this.isLoading = true;
    }

    public ngOnChanges() {
        if (this.chartData) {
            this.isLoading = false;

            this.labels = _.map(this.chartData,
                (item: any) => moment(this.fromTime).add(item.offset, 's').format('DD.MM HH:mm')
            );
            this.data = _.chain(this.chartData)
                .map(
                    (item: any) => _.round(item.conversion * 100, 0)
                )
                .chunk(this.chartData.length)
                .value();

        }
    }
}
