var sidebar = angular.module('sidebar', []);

sidebar.component('sidebar', {
    templateUrl: 'components/sidebar/sidebar.html',
    controller: function ($location) {
        this.isActive = location => location === $location.path();
    }
});
