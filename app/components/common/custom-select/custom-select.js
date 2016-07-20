var select = angular.module('customSelect', []);

select.component('customSelect', {
    template: `<select class="select2_single form-control custom_select">
                    <option></option>
                    <option value="AK">Alaska</option>
                    <option value="HI">Hawaii</option>
                    <option value="CA">California</option>
                    <option value="NV">Nevada</option>
                    <option value="OR">Oregon</option>
                </select>`,
    controller: function () {
        $(".select2_single").select2({
            allowClear: true,
            placeholder: ""
        });
    }
});