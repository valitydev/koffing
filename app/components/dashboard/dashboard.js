var dashboard = angular.module('dashboard', []);

dashboard.component('dashboard', {
    templateUrl: 'components/dashboard/dashboard.html',
    controller: function () {
        this.testField = 'Test';
    }
});
