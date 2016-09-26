const resources = angular.module('resources', ['ngResource']);

resources.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('dateInterceptor');
});
