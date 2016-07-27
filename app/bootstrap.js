angular.element(document).ready(function () {
    var keycloakAuth = new Keycloak('keycloak.json');

    keycloakAuth.init({onLoad: 'login-required'}).success(function () {
        koffing.factory('Auth', function ($log) {
            $log.debug(keycloakAuth);
            return {
                profileName: keycloakAuth.tokenParsed.name,
                logout: keycloakAuth.logout
            };
        });
        angular.bootstrap(document, ['koffing']);
    });
});
