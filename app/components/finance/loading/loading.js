var finance = angular.module('loading', []);

finance.component('loading', {
    template: `<a ng-show="$ctrl.isLoading" class="fa fa-cog fa-spin fa-3x fa-fw" style="width: 100%"></a>
    <div ng-show="!$ctrl.isLoading" ng-transclude></div>`,
    transclude: true,
    bindings: {
        isLoading: '='
    }
});
