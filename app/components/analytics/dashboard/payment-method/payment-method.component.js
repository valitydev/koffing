const paymentMethod = angular.module('paymentMethod', []);

paymentMethod.component('paymentMethod', {
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
                const grouped = _.groupBy(this.chartData, 'paymentSystem');
                const paymentSystem = _.keys(grouped);
                const data = [];
                _.forEach(paymentSystem, system => data.push(
                    _.chain(grouped[system])
                        .reduce((acc, item) => acc + item.totalCount, 0)
                        .value()
                ));
                this.labels = _.map(paymentSystem, system => {
                    let result = system;
                    if (system === 'visa') {
                        result = 'Visa';
                    } else if (system === 'master_card') {
                        result = 'Master Card';
                    }
                    return result;
                });
                this.data = data;
            }
        };

        this.options = {
            animation: false,
            legend: {
                display: true,
                position: 'left'
            }
        }
    }
});

