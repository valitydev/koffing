const tokenizer = angular.module('tokenizer', []);

tokenizer.component('tokenizer', {
    template: `
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <div class="x_panel tile">
                <div class="x_content">
                    <form>
                        <div class="form-group">
                            <label><h4>Ваш токен для инициализации платежной формы</h4></label>
                            <textarea rows="15" type="text" class="form-control" ng-model="$ctrl.token"></textarea>
                        </div>
                        <button type="button" class="btn btn-primary" ng-click="$ctrl.back()">Назад</button>
                    </form>
                </div>
            </div>
        </div>
    </div>`,
    controller: function ($window, Tokenizer) {
        this.token = Tokenizer.refreshToken;
        this.back = () => {
            $window.location.href = '/';
        };
    }
});

angular.element(document).ready(function () {
    const keycloak = new Keycloak({
        url: 'http://localhost:31245/auth',
        realm: 'external',
        clientId: 'tokenizer'
    });
    keycloak.init().success(authenticated => {
        if (!authenticated) {
            keycloak.login({
                scope: 'offline_access'
            });
        }
        tokenizer.factory('Tokenizer', () => {
            return {
                refreshToken: keycloak.refreshToken,
            };
        });
        angular.bootstrap(document, ['tokenizer']);
    });
});
