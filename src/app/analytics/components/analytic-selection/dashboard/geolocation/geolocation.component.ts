import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { CHART_OPTIONS } from './../chart-options.const';
import { GeoChartLabeled } from './../geo-chart-labeled.class';

@Component({
    selector: 'kof-geolocation',
    templateUrl: './geolocation.component.pug'
})
export class GeolocationComponent implements OnInit, OnChanges {

    @Input()
    public chartData: GeoChartLabeled;
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
        if (this.chartData) {
            this.isLoading = false;
        }
    }
}
