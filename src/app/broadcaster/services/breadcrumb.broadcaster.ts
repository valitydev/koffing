import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Broadcaster } from 'koffing/broadcaster/services/broadcaster.service';
import { BreadcrumbConfig } from 'koffing/broadcaster/services/breadcrumb-config';

@Injectable()
export class BreadcrumbBroadcaster {

    constructor(private broadcaster: Broadcaster) {}

    public fire(config: BreadcrumbConfig[]) {
        this.broadcaster.broadcast(BreadcrumbBroadcaster, config);
    }

    public on(): Observable<BreadcrumbConfig[]> {
        return this.broadcaster.on<BreadcrumbConfig[]>(BreadcrumbBroadcaster);
    }
}
