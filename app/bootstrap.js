angular.element(document).ready(function () {
    var keycloakAuth = new Keycloak('keycloak.json');

    keycloakAuth.init({onLoad: 'login-required'}).success(function () {
        koffing.factory('Auth', function ($log) {
            $log.debug(keycloakAuth);
            return {
                profileName: keycloakAuth.tokenParsed.name,
                logout: keycloakAuth.logout,
                token: keycloakAuth.token,
                updateToken: keycloakAuth.updateToken
            };
        });
        angular.bootstrap(document, ['koffing']);
    });
});
