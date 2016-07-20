var paymentConversion = angular.module('paymentConversion', ['chart.js']);

paymentConversion.component('paymentConversion', {
    template: `<div><canvas class="chart chart-line" chart-data="$ctrl.data" chart-labels="$ctrl.labels" 
        chart-series="$ctrl.series" chart-options="$ctrl.options" chart-dataset-override="$ctrl.datasetOverride" 
        chart-click="$ctrl.onClick" height="80"></canvas></div>`,
    controller: function () {
        this.labels = ["01.06.16", "02.06.16", "03.06.16", "04.06.16", "05.06.16", "06.06.16", "07.06.16"];
        this.series = ['Начатые', 'Успешные', 'Незавершенные'];
        this.data = [
            [23, 34, 33, 23, 56, 55, 40],
            [28, 44, 50, 35, 86, 27, 46],
            [22, 54, 23, 76, 56, 33, 23]
        ];
        this.onClick = function (points, evt) {
            console.log(points, evt);
        };
        this.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        this.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            },
            legend: {
                display: true
            },
            animation: false
        };
    }
});