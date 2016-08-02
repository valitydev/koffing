datepicker.component('datepicker', {
    template: `<input daterangepicker ng-model="$ctrl.date" class="form-control">
        <span class="fa fa-calendar form-control-feedback right" aria-hidden="true"></span>`,
    bindings: {
        date: '='
    }
});
