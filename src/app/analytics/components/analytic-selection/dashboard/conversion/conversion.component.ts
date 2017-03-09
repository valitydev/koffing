import { Component, Input, OnChanges } from '@angular/core';

import { CHART_OPTIONS } from './../chart-options.const';
import { ConversionDataService } from './conversion-data.service';

@Component({
    selector: 'kof-conversion',
    templateUrl: './conversion.component.pug'
})
export class ConversionComponent implements OnChanges {

    @Input()
    public fromTime: any;

    @Input()
    public chartData: any[];

    public labels: string[];

    public datasets: any[] = [];

    public options: any = {
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

    public ngOnChanges() {
        if (this.chartData) {
            this.labels = ConversionDataService.toLabels(this.fromTime, this.chartData);
            const data = ConversionDataService.toData(this.chartData);
            if (data.length > 0) {
                this.datasets = [{
                    data,
                    label: 'Конверсия'
                }];
            } else {
                this.datasets = [];
            }
        }
    }
}
