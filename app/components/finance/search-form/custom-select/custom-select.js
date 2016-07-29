var select = angular.module('customSelect', []);

select.component('customSelect', {
    template: `<select class="select2_single form-control custom_select" ng-model="$ctrl.selected">
                    <option value=""></option>
                    <option ng-repeat="option in $ctrl.options" value="{{option.key}}">{{option.name}}</option>
                </select>`,
    bindings: {
        options: '<',
        selected: '='
    },
    controller: function () {
        $(".select2_single").select2({
            minimumResultsForSearch: -1,
            allowClear: true,
            placeholder: ''
        });
    }
});