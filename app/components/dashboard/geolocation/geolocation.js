var geolocation = angular.module('geolocation', ['chart.js']);

geolocation.component('geolocation', {
    template: `<div><canvas class="chart chart-doughnut" chart-data="$ctrl.data" chart-labels="$ctrl.labels" chart-options="$ctrl.options"></canvas> </div>`,
    controller: function () {
        this.labels = ['Москва', 'Санкт-Петербург', 'Ростов', 'Самара', 'Краснодар'];
        this.data = [9343, 3000, 1237, 1179, 978];
        this.options = {
            legend: {
                display: true,
                position: 'left'
            },
            animation: false
        }
    }
});