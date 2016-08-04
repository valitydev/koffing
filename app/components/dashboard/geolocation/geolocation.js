var geolocation = angular.module('geolocation', ['chart.js', 'resources']);

geolocation.component('geolocation', {
    template: `<div><canvas class="chart chart-doughnut" chart-data="$ctrl.data" chart-labels="$ctrl.labels" chart-options="$ctrl.options"></canvas> </div>`,
    bindings: {
        fromTime: '<',
        toTime: '<'
    },
    controller: function (Stats) {
        Stats.geo({
            fromTime: this.fromTime,
            toTime: this.toTime,
            splitUnit: 'month',
            splitSize: 1
        }, result => {
            this.labels = _.map(result, item => item.city_name);
            this.data = _.chain(result).map(item => item.profit / 100).value();
        });

        this.options = {
            legend: {
                display: true,
                position: 'left'
            }
        }
    }
});
