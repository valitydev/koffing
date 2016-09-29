const infoPanel = angular.module('infoPanel', ['currency']);

infoPanel.component('infoPanel', {
    templateUrl: 'components/analytics/dashboard/info-panel/info-panel.template.html',
    bindings: {
        uniqueCount: '<',
        successfulCount: '<',
        unfinishedCount: '<',
        profit: '<',
        account: '<'
    },
    controller: function () {
        this.profitLoading = true;
        this.successfulCountLoading = true;
        this.unfinishedCountLoading = true;
        this.uniqueCountLoading = true;
        this.accountsLoading = true;
        this.$onChanges = () => {
            if (_.isNumber(this.profit)) {
                this.profitLoading = false;
            }
            if (_.isNumber(this.successfulCount)) {
                this.successfulCountLoading = false;
            }
            if (_.isNumber(this.unfinishedCount)) {
                this.unfinishedCountLoading = false;
            }
            if(_.isNumber(this.uniqueCount)) {
                this.uniqueCountLoading = false;
            }
            if (this.account) {
                this.accountsLoading = false;
            }
        };
    }
});