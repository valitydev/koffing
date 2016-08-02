var resources = angular.module('resources', ['ngResource']);

resources.constant('URL', {
    capiUrl: 'http://localhost:9000/v1/'
});

resources.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
