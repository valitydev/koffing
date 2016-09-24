analytics.component('shopSelect', {
    template: `<select class="select2_multiple form-control custom_select" select2 ng-model="$ctrl.selected">
                    <option value=""></option>
                    <option ng-repeat="option in $ctrl.options" value="{{option.key}}">{{option.name}}</option>
                </select>`,
    bindings: {
        options: '=',
        selected: '='
    },
    controller: function () {

    }

});