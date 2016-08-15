const conversion = angular.module('conversion', []);

conversion.component('conversion', {
    template: `<loading is-loading="$ctrl.isLoading">
        <canvas class="chart chart-line" chart-data="$ctrl.data" chart-labels="$ctrl.labels" 
        chart-series="['Конверсия']" chart-options="$ctrl.options" height="150"></canvas>
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
                this.labels = _.map(this.chartData, item => moment(this.fromTime).add(item.offset, 's').format('DD.MM.YYYY HH:mm'));
                this.data = _.chain(this.chartData)
                    .map(item => _.round(item.conversion * 100, 0))
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
