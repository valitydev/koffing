var revenue = angular.module('revenue', ['chart.js', 'resources']);

revenue.component('revenue', {
    template: `<div><canvas class="chart chart-line" chart-data="$ctrl.data" chart-labels="$ctrl.labels"
        chart-options="$ctrl.options" height="80"></canvas></div>`,
    bindings: {
        fromTime: '<',
        toTime: '<'
    },
    controller: function (Stats) {
        Stats.revenue({
            fromTime: this.fromTime,
            toTime: this.toTime,
            splitUnit: 'day',
            splitSize: 1
        }, result => {
            this.labels = _.map(result, item => moment(this.fromTime).add(item.offset, 's').format('DD.MM'));
            this.data = _.chain(result).map(item => item.profit / 100).chunk(result.length).value();
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