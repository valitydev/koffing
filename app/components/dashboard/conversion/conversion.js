var conversion = angular.module('conversion', ['chart.js', 'resources']);

conversion.component('conversion', {
    template: `<div><canvas class="chart chart-line" chart-data="$ctrl.data" chart-labels="$ctrl.labels" 
        chart-options="$ctrl.options" height="150"></canvas></div>`,
    bindings: {
        fromTime: '<',
        toTime: '<'
    },
    controller: function (Stats) {
        Stats.conversion({
            fromTime: this.fromTime,
            toTime: this.toTime,
            splitUnit: 'day',
            splitSize: 2
        }, result => {
            this.labels = _.map(result, item => moment(this.fromTime).add(item.offset, 's').format('DD.MM'));
            this.data = _.chain(result).map(item => item.conversion).chunk(result.length).value();
        });

        this.options = {
            scales: {
                yAxes: [{
                    stacked: true
                }]
            }
        };
    }
});
