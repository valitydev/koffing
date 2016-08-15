const revenue = angular.module('revenue', ['chart.js']);

revenue.component('revenue', {
    template: `<loading is-loading="$ctrl.isLoading">
        <canvas class="chart chart-line" chart-data="$ctrl.data" chart-labels="$ctrl.labels" 
            chart-options="$ctrl.options" chart-series="['Оборот']" height="80"></canvas>
    </loading>`,
    bindings: {
        fromTime: '<',
        chartData: '<'
    },
    controller: function () {
        this.isLoading = true;
        this.$onChanges = () => {
            if (this.chartData) {
                this.isLoading = false;
                this.labels = _.map(this.chartData, item => moment(this.fromTime).add(item.offset, 's').format('DD.MM'));
                this.data = _.chain(this.chartData)
                    .map(item => _.round(item.profit / 100, 2))
                    .chunk(this.chartData.length)
                    .value();
            }
        };

        this.options = {
            scales: {
                yAxes: [{
                    stacked: true
                }]
            }
        };
    }
});
