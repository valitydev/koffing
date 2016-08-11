var resources = angular.module('resources', ['ngResource']);

resources.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
