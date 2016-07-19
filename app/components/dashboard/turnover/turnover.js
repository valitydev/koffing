var turnover = angular.module('turnover', ['chart.js']);

turnover.component('turnover', {
    template: `<div><canvas class="chart chart-line" chart-data="$ctrl.data" chart-labels="$ctrl.labels" 
        chart-series="$ctrl.series" chart-options="$ctrl.options" chart-dataset-override="$ctrl.datasetOverride" 
        chart-click="$ctrl.onClick" height="80"></canvas></div>`,
    controller: function () {
        this.labels = ["January", "February", "March", "April", "May", "June", "July"];
        this.data = [
            [137, 138, 140, 143, 140, 144, 140]
        ];
        this.onClick = function (points, evt) {
            console.log(points, evt);
        };
        this.options = {
        };
    }
});