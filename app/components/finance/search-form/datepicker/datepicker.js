var datepicker = angular.module('datepicker', []);

datepicker.directive('datepickerTest', function () {
    const libConfig = {
        singleDatePicker: true,
        calender_style: 'picker_2',
        locale: {
            daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        },
        autoUpdateInput: false
    };

    const formatConfig = {
        displayFormat: 'DD.MM.YYYY',
        modelFormat: 'YYYY-MM-DDTHH:mm:ssZ'
    };

    return {
        restrict: 'E',
        require: 'ngModel',
        template: `<input class="form-control"><span class="fa fa-calendar form-control-feedback right" aria-hidden="true"></span>`,
        link: function (scope, element, attrs, ngModel) {
            const input = element.find('input');
            input.daterangepicker(libConfig);

            input.on('apply.daterangepicker', (ev, picker) => {
                let formatted = moment(picker.startDate).format(formatConfig.modelFormat);
                ngModel.$setViewValue(formatted);
                ngModel.$render();
            });

            ngModel.$render = function () {
                let value = ngModel.$viewValue;
                let formatted = value ? moment(value).format(formatConfig.displayFormat) : '';
                input.val(formatted);
            };
        }
    };
});

datepicker.component('datepicker', {
    template: `<input class="form-control" ng-model="$ctrl.date"><span class="fa fa-calendar form-control-feedback right" aria-hidden="true"></span>`,
    bindings: {
        date: '='
    },
    controller: function ($element) {
        const displayFormat = 'DD.MM.YYYY';
        const modelFormat = 'YYYY-MM-DDTHH:mm:ssZ';

        var el = $element.find('input');
        el.daterangepicker({
            singleDatePicker: true,
            calender_style: 'picker_2',
            locale: {
                format: displayFormat,
                daysOfWeek: [
                    'Пн',
                    'Вт',
                    'Ср',
                    'Чт',
                    'Пт',
                    'Сб',
                    'Вс'
                ],
                monthNames: [
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь'
                ]
            },
            autoUpdateInput: false
        });

        el.on('apply.daterangepicker', (ev, picker) => {
            const selectedDate = moment(picker.startDate);
            this.date = selectedDate.format(displayFormat);
            el.val(selectedDate.format(displayFormat));
        });

        // el.blur(() => !el.val() && this.onDelete());
    }
});
