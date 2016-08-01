datepicker.directive('daterangepicker', function () {
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
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.daterangepicker(libConfig);

            element.on('apply.daterangepicker', (ev, picker) => {
                let formatted = moment(picker.startDate).format(formatConfig.modelFormat);
                ngModel.$setViewValue(formatted);
                ngModel.$render();
            });

            element.blur(() => !element.val() && ngModel.$setViewValue(''));

            ngModel.$render = function () {
                let value = ngModel.$viewValue;
                let formatted = value ? moment(value).format(formatConfig.displayFormat) : '';
                element.val(formatted);
            };
        }
    };
});
