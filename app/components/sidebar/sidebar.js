const sidebar = angular.module('sidebar', []);

sidebar.component('sidebar', {
    templateUrl: 'components/sidebar/sidebar.html',
    controller: function ($window, $location) {

        this.getToken = () => {
            $window.location.href = '/tokenization.html';
        };

        this.isActive = location => _.includes($location.path(), location);
    }
});
