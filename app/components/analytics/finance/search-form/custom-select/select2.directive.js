customSelect.directive('select2', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.select2({
                placeholder: ''
            });
        }
    }
});
