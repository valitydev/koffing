import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Http, XHRBackend, RequestOptions, HttpModule } from '@angular/http';

import { RootModule } from './root/root.module';
import { AuthHttpInterceptor } from './auth/interceptors/auth-http.interceptor';
import { ConfigService } from './backend/services/config.service';
import { ContainerComponent } from './root/components/container/container.component';
import { HttpErrorBroadcaster } from 'koffing/broadcaster/services/http-error-broadcaster.service';

@NgModule({
    imports: [
        HttpModule,
        RootModule
    ],
    providers: [
        {
            provide: Http,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                httpErrorBroadcaster: HttpErrorBroadcaster
            ) => new AuthHttpInterceptor(backend, defaultOptions, httpErrorBroadcaster),
            deps: [XHRBackend, RequestOptions, HttpErrorBroadcaster]
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (config: ConfigService) => () => config.load(),
            deps: [ConfigService],
            multi: true
        }
    ],
    bootstrap: [ContainerComponent]
})
export class AppModule { }
