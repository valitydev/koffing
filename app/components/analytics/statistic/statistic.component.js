statistic.component('statistic', {
    templateUrl: 'components/analytics/statistic/statistic.template.html',
    controller: function () {
        this.$routerOnActivate = (next) => {
            console.log(next);
        }
    }
});
