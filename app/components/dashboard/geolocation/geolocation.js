var geolocation = angular.module('geolocation', []);

geolocation.component('geolocation', {
    template: `<loading is-loading="$ctrl.isLoading">
        <canvas class="chart chart-doughnut" chart-data="$ctrl.data" chart-labels="$ctrl.labels" chart-options="$ctrl.options"></canvas>
    </loading>`,
    bindings: {
        chartData: '<'
    },
    controller: function () {
        this.isLoading = true;
        this.$onChanges = () => {
            if (this.chartData) {
                this.isLoading = false;
                const grouped = _.groupBy(this.chartData, 'cityName');
                const cities = _.keys(grouped);
                const data = [];
                _.forEach(cities, city => {
                    data.push(_.reduce(grouped[city], (acc, item) => acc + (item.profit / 100), 0));
                });
                this.labels = cities;
                this.data = data;
            }
        };

        this.options = {
            legend: {
                display: true,
                position: 'left'
            }
        }
    }
});
