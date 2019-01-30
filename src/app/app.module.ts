import { NgModule, APP_INITIALIZER } from '@angular/core';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';

import { ConfigService } from 'koffing/backend/config.service';
import { KoffingHttp } from 'koffing/backend/koffing-http.service';
import { HttpErrorBroadcaster } from 'koffing/broadcaster';
import { ContainerComponent } from './root/components/container/container.component';
import { RootModule } from './root/root.module';

@NgModule({
    imports: [HttpModule, RootModule],
    providers: [
        {
            provide: KoffingHttp,
            useFactory: (
                backend: XHRBackend,
                defaultOptions: RequestOptions,
                httpErrorBroadcaster: HttpErrorBroadcaster
            ) => new KoffingHttp(backend, defaultOptions, httpErrorBroadcaster),
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
export class AppModule {}
