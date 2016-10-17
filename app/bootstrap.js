angular.element(document).ready(function () {
    var keycloakAuth = new Keycloak('koffingKeycloakConfig.json');

    keycloakAuth.init({onLoad: 'login-required'}).success(function () {
        app.factory('Auth', function () {
            return {
                profileName: keycloakAuth.tokenParsed.name,
                logout: keycloakAuth.logout,
                token: keycloakAuth.token,
                updateToken: keycloakAuth.updateToken
            };
        });
        jQuery.get('appConfig.json').then(result => { //TODO write wrapper
            app.constant('appConfig', result);
            angular.bootstrap(document, ['app']);
        });
    });
});
