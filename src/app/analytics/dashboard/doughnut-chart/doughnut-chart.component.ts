import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DoughnutChartData } from 'koffing/analytics/dashboard/stats-data/doughnut-chart-data';

@Component({
    selector: 'kof-doughnut-chart',
    templateUrl: './doughnut-chart.component.pug'
})
export class DoughnutChartComponent implements OnInit {

    @Input()
    public chartData: Observable<DoughnutChartData>;

    public labels: string[] = [];

    public data: number[] = [];

    public options = {
        animation: false,
        legend: {
            display: true,
            position: 'left'
        }
    };

    public chartColors = [{
        backgroundColor : [
            '#ddf0e1',
            '#cee9f6',
            '#fddadb',
            '#ebdaff',
            '#f5ecdd',
            '#f6d4dc',
            '#fdc478',
            '#aec4e8',
            '#c0f1f0',
            '#949fb1',
            '#bba8dc',
            '#d4cfcd',
            '#ffb6b6',
            '#f2fdeb',
            '#f8f8f8',
            '#ccfaf6'
        ]
    }];

    public ngOnInit() {
        this.chartData.subscribe((chartData: DoughnutChartData) => {
            this.labels = chartData.labels;
            this.data = chartData.data;
        });
    }
}
