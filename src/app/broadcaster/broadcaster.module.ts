import { NgModule } from '@angular/core';
import { Broadcaster } from './services/broadcaster.service';
import { ToggleMenuBroadcaster } from './services/toggle-menu-broadcaster.service';
import { HttpErrorBroadcaster } from './services/http-error-broadcaster.service';
import { ClaimReceiveBroadcaster } from './services/claim-receive.broadcaster.service';
import { ClaimRevokeBroadcaster } from './services/claim-revoke-broadcaster.service';
import { BreadcrumbBroadcaster } from './services/breadcrumb.broadcaster';

@NgModule({
    providers: [
        Broadcaster,
        ToggleMenuBroadcaster,
        HttpErrorBroadcaster,
        ClaimReceiveBroadcaster,
        ClaimRevokeBroadcaster,
        BreadcrumbBroadcaster
    ]
})
export class BroadcasterModule {}
