import { Component, Input, OnChanges } from '@angular/core';

import { CHART_OPTIONS } from './../chart-options.const';
import { GeoChartLabeled } from './../geo-chart-labeled.class';

@Component({
    selector: 'kof-geolocation',
    templateUrl: './geolocation.component.pug'
})
export class GeolocationComponent implements OnChanges {

    @Input()
    public chartData: GeoChartLabeled;
    public data: number[] = [];
    public labels: string[] = [];
    public type: string = 'doughnut';
    public options: any = {
        animation: false,
        legend: {
            display: true,
            position: 'left'
        }
    };
    public chartColors = [CHART_OPTIONS.DOUGHNUT.COLORS];

    public ngOnChanges() {
        if (this.chartData) {
            this.data = this.chartData.data;
            this.labels = this.chartData.cityNames;
        }
    }
}
