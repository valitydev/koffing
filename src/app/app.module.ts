import { NgModule, APP_INITIALIZER } from '@angular/core';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';

import { RootModule } from './root/root.module';
import { ConfigService } from './backend/config.service';
import { ContainerComponent } from './root/components/container/container.component';
import { HttpErrorBroadcaster } from 'koffing/broadcaster/services/http-error-broadcaster.service';
import { CapiHttp } from 'koffing/backend/capi-http.service';

@NgModule({
    imports: [
        HttpModule,
        RootModule
    ],
    providers: [
        {
            provide: CapiHttp,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                httpErrorBroadcaster: HttpErrorBroadcaster
            ) => new CapiHttp(backend, defaultOptions, httpErrorBroadcaster),
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
