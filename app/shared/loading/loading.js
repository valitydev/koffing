var loading = angular.module('loading', []);

loading.component('loading', {
    template: `<a ng-show="$ctrl.isLoading" class="fa fa-cog fa-spin fa-fw loading_spinner"></a>
    <div ng-show="!$ctrl.isLoading" ng-transclude></div>`,
    transclude: true,
    bindings: {
        isLoading: '='
    }
});
