const sidebar = angular.module('sidebar', []);

sidebar.component('sidebar', {
    templateUrl: 'components/sidebar/sidebar.html',
    controller: function ($location) {
        this.$routerOnActivate = () => {
            const path = $location.path();
            console.log(path);
        };

        this.isActive = location => {
            const cleaned = _.replace(location, '/', '');
            const result = _.chain($location.path())
                .split('/')
                .find(item => item === cleaned)
                .value();
            return result && result.length > 0;
        };
    }
});
