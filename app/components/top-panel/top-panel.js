const topPanel = angular.module('topPanel', []);

topPanel.component('topPanel', {
    templateUrl: 'components/top-panel/top-panel.html',
    controller: function () {
        // this.profileName = Auth.profileName;
        // this.logout = Auth.logout;
        // this.token = Auth.token;
        this.profileName = 'test name';
        this.logout = () => {};
        this.token = 'test token';
    }
});
