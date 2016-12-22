export class OfflineTokenService {

    public static authFlowPath: string = '/getOfflineToken';

    public static storageKey: string = 'offlineToken';

    public static sessionKey: string = 'sessionId';

    public static isTokenizationFlowPath() {
        return window.location.pathname === this.authFlowPath;
    }

    public static setToken(token: string, sessionId: string, redirectPath: string) {
        localStorage.setItem(this.storageKey, token);
        localStorage.setItem(this.sessionKey, sessionId);
        window.location.href = redirectPath;
    }

    public static getToken(sessionId: string): any {
        const storageSessionId = localStorage.getItem(this.sessionKey);
        if (sessionId === storageSessionId) {
            const token = localStorage.getItem(this.storageKey);
            return token ? token : this.goToAuthFlowPath();
        } else {
            this.clearToken();
            this.goToAuthFlowPath();
        }
    }

    public static clearToken() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.sessionKey);
    }

    private static goToAuthFlowPath() {
        window.location.href = this.authFlowPath;
    }
}
