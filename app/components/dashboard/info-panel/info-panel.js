var infoPanel = angular.module('infoPanel', []);

infoPanel.component('infoPanel', {
    templateUrl: 'components/dashboard/info-panel/info-panel.html',
    bindings: {
        uniqueCount: '<',
        successfulCount: '<',
        unfinishedCount: '<',
        profit: '<'
    },
    controller: function () {
        this.profitLoading = true;
        this.successfulCountLoading = true;
        this.unfinishedCountLoading = true;
        this.uniqueCountLoading = true;
        this.$onChanges = () => {
            if (this.profit) {
                this.profitLoading = false;
            }
            if (this.successfulCount) {
                this.successfulCountLoading = false;
            }
            if (this.unfinishedCount) {
                this.unfinishedCountLoading = false;
            }
            if(this.uniqueCount) {
                this.uniqueCountLoading = false;
            }
        };
    }
});