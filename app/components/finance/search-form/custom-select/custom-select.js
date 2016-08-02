var select = angular.module('customSelect', []);

select.component('customSelect', {
    template: `<select class="select2_single form-control custom_select" ng-model="$ctrl.selected">
                    <option value=""></option>
                    <option ng-repeat="option in $ctrl.options" value="{{option.key}}">{{option.name}}</option>
                </select>`,
    bindings: {
        selected: '='
    },
    controller: function (PAYMENT_STATUSES) {
        this.options = [
            {key: 'unpaid', name: 'Неоплаченный'},
            {key: 'cancelled', name: 'Отмененный'},
            {key: 'paid', name: 'Оплаченный'},
            {key: 'refunded', name: 'Возвращенный'},
            {key: 'fulfilled', name: 'Выполненный'}
        ];

        $(".select2_single").select2({
            minimumResultsForSearch: -1,
            allowClear: true,
            placeholder: ''
        });
    }
});