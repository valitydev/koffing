const sidebar = angular.module('sidebar', []);

sidebar.component('sidebar', {
    templateUrl: 'components/sidebar/sidebar.html',
    controller: function ($location) {
        this.$routerOnActivate = () => {
            const path = $location.path();
            console.log(path);
        };

        this.isActive = location => _.includes($location.path(), location);
    }
});
