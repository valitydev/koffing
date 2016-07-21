var datepicker = angular.module('datepicker', []);

datepicker.component('datepicker', {
    template: `<input class="form-control"><span class="fa fa-calendar form-control-feedback right" aria-hidden="true"></span>`,
    controller: function ($element) {
        var el = $element.find('input');
        el.daterangepicker({
            singleDatePicker: true,
            calender_style: 'picker_2',
            locale: {
                format: 'DD.MM.YYYY',
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
        el.on('apply.daterangepicker', (ev, picker) =>
            el.val(picker.startDate.format(picker.locale.format)));
    }
});
