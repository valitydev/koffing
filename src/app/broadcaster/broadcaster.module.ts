import { NgModule } from '@angular/core';
import { Broadcaster } from './services/broadcaster.service';
import { ToggleMenuBroadcaster } from './services/toggle-menu-broadcaster.service';
import { HttpErrorBroadcaster } from './services/http-error-broadcaster.service';
import { ClaimReceiveBroadcaster } from 'koffing/broadcaster/services/claim-receive.broadcaster.service';

@NgModule({
    providers: [
        Broadcaster,
        ToggleMenuBroadcaster,
        HttpErrorBroadcaster,
        ClaimReceiveBroadcaster
    ]
})
export class BroadcasterModule { }

export * from './services/broadcaster.service';
export * from './services/toggle-menu-broadcaster.service';
export * from './services/http-error-broadcaster.service';
export * from './services/claim-receive.broadcaster.service';
