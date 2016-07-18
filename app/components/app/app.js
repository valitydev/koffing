var koffing = angular.module('koffing', ['ngComponentRouter', 'dashboard', 'sidebar', 'topPanel', 'templates']);

koffing.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});

koffing.value('$routerRootComponent', 'app');

koffing.component('app', {
    templateUrl: 'components/app/app.html',
    $routeConfig: [
        { path: '/dashboard', name: 'Dashboard', component: 'dashboard', useAsDefault: true }
    ]
});
