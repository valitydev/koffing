import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LineChartData } from 'koffing/analytics/stats-data/line-chart-data';

@Component({
    selector: 'kof-line-chart',
    templateUrl: './line-chart.component.pug'
})
export class LineChartComponent implements OnInit {

    @Input()
    public chartData: Observable<LineChartData>;

    public labels: string[] = [];

    public datasets: any[] = [];

    public options = {
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

    public chartColors = [{
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#73879C',
        pointBackgroundColor: '#73879C',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#79909c',
        pointHoverBorderColor: '#fff',
    }];

    public ngOnInit() {
        this.chartData.subscribe((chartData: LineChartData) => {
            this.datasets.pop();
            this.datasets.push(chartData.datasets[0]);
            this.labels = chartData.labels;
        });
    }
}
