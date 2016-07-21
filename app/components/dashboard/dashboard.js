var dashboard = angular.module('dashboard', ['turnover', 'paymentMethods', 'paymentConversion', 'geolocation']);

dashboard.component('dashboard', {
    templateUrl: 'components/dashboard/dashboard.html',
    controller: function () {
        this.statisticInfo = [
            {title: 'Баланс', count: '63 000', bottom: 'Рублей'},
            {title: 'Оборот', count: '1 325 000', bottom: 'Рублей'},
            {title: 'Успешные', count: '1 274 300', bottom: 'Рублей'},
            {title: 'Незавершенные', count: '50 700', bottom: 'Рублей'},
            {title: 'Средний чек', count: '8 700', bottom: 'Рублей'},
            {title: 'Плательщиков', count: '598', bottom: ''}
        ];
    }
});
