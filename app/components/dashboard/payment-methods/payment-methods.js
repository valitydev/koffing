var paymentMathods = angular.module('paymentMethods', ['chart.js']);

paymentMathods.component('paymentMethods', {
    template: `<div><canvas class="chart chart-doughnut" chart-data="$ctrl.data" chart-labels="$ctrl.labels" chart-options="$ctrl.options"></canvas></div>`,
    controller: function () {
        this.labels = ["Терминалы", "Салоны связи", "Прочее"];
        this.data = [15, 40, 45];

        this.options = {
            legend: {
                display: true,
                position: 'left'
            }
        }
    }
});
