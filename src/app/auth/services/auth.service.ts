import { OfflineTokenService } from './offline-token.service';
import { AuthInfo } from '../classes/AuthInfo.class';

declare const Keycloak: any;

export class AuthService {

    public static koffingInstance: any;

    public static init(): Promise<any> {
        return OfflineTokenService.isTokenizationFlowPath() ? this.initTokenization() : this.initKoffing();
    }

    public static logout() {
        this.koffingInstance.logout();
        OfflineTokenService.clearToken();
    }

    public static updateToken(minValidity: number) {
        return this.koffingInstance.updateToken(minValidity);
    }

    public static getAccountInfo(): AuthInfo {
        const result = new AuthInfo();
        if (this.koffingInstance) {
            result.profileName = this.koffingInstance.tokenParsed.name;
            result.token = this.koffingInstance.token;
        }
        return result;
    }

    public static getOfflineToken(): string {
        return OfflineTokenService.getToken(this.koffingInstance.sessionId);
    }

    private static initKoffing(): Promise<any> {
        const keycloakAuth: any = new Keycloak('koffingKeycloakConfig.json');
        return new Promise((resolve, reject) => {
            keycloakAuth.init({onLoad: 'login-required'}).success(() => {
                this.koffingInstance = keycloakAuth;
                resolve();
            }).error(() => reject());
        });
    }

    private static initTokenization(): Promise<any> {
        const keycloakAuth: any = new Keycloak('tokenizationKeycloakConfig.json');
        return new Promise((resolve, reject) => {
            keycloakAuth.init().success((authenticated: any) => {
                if (!authenticated) {
                    keycloakAuth.login({
                        scope: 'offline_access'
                    });
                } else {
                    OfflineTokenService.setToken(keycloakAuth.refreshToken, keycloakAuth.sessionId, '/tokenization');
                    resolve();
                }
            }).error(() => reject());
        });
    }
}
