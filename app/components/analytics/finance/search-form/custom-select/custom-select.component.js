customSelect.component('customSelect', {
    template: `<select class="select2_multiple form-control custom_select" select2 multiple="multiple" ng-model="$ctrl.selected">
                    <option value=""></option>
                    <option ng-repeat="option in $ctrl.options" value="{{option.key}}">{{option.name}}</option>
                </select>`,
    bindings: {
        selected: '='
    },
    controller: function (PAYMENT_STATUSES) {
        this.options = _.map(PAYMENT_STATUSES, (name, key) => {
            return {name, key}
        });
    }
});
