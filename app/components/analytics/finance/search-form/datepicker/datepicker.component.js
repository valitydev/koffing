datepicker.component('datepicker', {
    template: `<input type="text" daterangepicker ng-model="$ctrl.date" class="form-control">`,
    bindings: {
        date: '='
    }
});
