import { Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { HttpErrorBroadcaster } from 'koffing/broadcaster/services/http-error-broadcaster.service';
import { AuthService } from 'koffing/auth/auth.service';

export class CapiHttp extends Http {

    constructor(
        connectionBackend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private httpErrorBroadcaster: HttpErrorBroadcaster
    ) {
        super(connectionBackend, defaultOptions);
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.request, url, options);
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.get, url, options);
    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.post, url, options, body);
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.put, url, options, body);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.delete, url, options);
    }

    public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.patch, url, options, body);
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.head, url, options);
    }

    public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.options, url, options);
    }

    private configureRequest(
        f: any,
        url: string | Request,
        options: RequestOptionsArgs,
        body?: any
    ) {
        const tokenPromise: Promise<string> = this.getToken();
        const tokenObservable: Observable<string> = Observable.fromPromise(tokenPromise);
        const tokenUpdateObservable: Observable<any> = Observable.create((observer: any) => {
            if (!options) {
                const headers = new Headers();
                options = new RequestOptions({headers});
            }
            this.setHeaders(options);
            observer.next();
            observer.complete();
        });
        const requestObservable: Observable<Response> = Observable.create((observer: any) => {
            let result: any;
            if (body) {
                result = f.apply(this, [url, body, options]);
            } else {
                result = f.apply(this, [url, options]);
            }
            result.subscribe((response: any) => {
                observer.next(response);
                observer.complete();
            }, (error: any) => {
                this.httpErrorBroadcaster.fire(error.status);
            });
        });
        return <Observable<Response>> Observable
            .merge(tokenObservable, tokenUpdateObservable, requestObservable, 1)
            .filter((response) => response instanceof Response);
    }

    private getToken(): Promise<string> {
        const minValidity = 5;
        return new Promise<string>((resolve, reject) => {
            const token: string = AuthService.getAccountInfo().token;
            if (token) {
                AuthService.updateToken(minValidity)
                    .success(() => resolve(token))
                    .error(() => reject('Failed to refresh token'));
            }
        });
    }

    private setHeaders(options: RequestOptionsArgs) {
        if (!options.headers) {
            options.headers = new Headers();
        }
        options.headers.set('Authorization', 'Bearer ' + AuthService.getAccountInfo().token);
        options.headers.set('X-Request-ID', this.guid());
        options.headers.set('Accept', 'application/json');
        options.headers.set('Content-Type', 'application/json; charset=UTF-8');
    }

    private guid(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return `${s4()}${s4()}-${s4()}-${s4()}`;
    }
}
