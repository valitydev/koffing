import { AuthInfo } from './auth-info';

declare const Keycloak: any;

export class AuthService {
    public static authInstance: any;

    public static init(): Promise<any> {
        const auth: any = new Keycloak('authConfig.json');
        return new Promise((resolve, reject) => {
            auth.init({ onLoad: 'login-required' })
                .success(() => {
                    this.authInstance = auth;
                    resolve();
                })
                .error(() => reject());
        });
    }

    public static logout() {
        this.authInstance.logout();
    }

    public static updateToken(minValidity: number) {
        return this.authInstance.updateToken(minValidity);
    }

    public static getAccountInfo(): AuthInfo {
        const result = new AuthInfo();
        if (this.authInstance) {
            result.profileName = this.authInstance.tokenParsed.name;
            result.email = this.authInstance.tokenParsed.email;
            result.token = this.authInstance.token;
            result.authUrl = this.authInstance.authServerUrl;
            result.partyId = this.authInstance.tokenParsed.sub;
        }
        return result;
    }
}
