var koffing = angular.module('koffing', [
    'ngComponentRouter',
    'dashboard',
    'finance',
    'sidebar',
    'topPanel',
    'templates'
]);

koffing.constant('appConfig', {
    capiUrl: 'http://localhost:9000/v1/',
    capiDatetimeFormat: 'YYYY-MM-DDTHH:mm:ssZ'
});

koffing.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});

koffing.value('$routerRootComponent', 'app');

koffing.component('app', {
    templateUrl: 'components/app/app.html',
    $routeConfig: [
        {path: '/dashboard', name: 'Dashboard', component: 'dashboard', useAsDefault: true},
        {path: '/finance', name: 'Finance', component: 'finance'}
    ]
});
