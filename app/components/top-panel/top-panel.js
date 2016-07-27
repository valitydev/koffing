var topPanel = angular.module('topPanel', []);

topPanel.component('topPanel', {
    templateUrl: 'components/top-panel/top-panel.html',
    controller: function (Auth) {
        this.profileName = Auth.profileName;
        this.logout = Auth.logout;
    }
});
