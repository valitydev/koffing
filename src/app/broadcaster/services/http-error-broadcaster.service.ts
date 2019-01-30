import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Broadcaster } from './broadcaster.service';

@Injectable()
export class HttpErrorBroadcaster {
    constructor(private broadcaster: Broadcaster) {}

    public fire(status: number) {
        this.broadcaster.broadcast(HttpErrorBroadcaster, status);
    }

    public on(): Observable<string> {
        return this.broadcaster.on<string>(HttpErrorBroadcaster);
    }
}
