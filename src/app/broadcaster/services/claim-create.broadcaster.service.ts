import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Broadcaster } from './broadcaster.service';

@Injectable()
export class ClaimCreateBroadcaster {

    constructor(private broadcaster: Broadcaster) {}

    public fire() {
        this.broadcaster.broadcast(ClaimCreateBroadcaster);
    }

    public on(): Observable<string> {
        return this.broadcaster.on<string>(ClaimCreateBroadcaster);
    }
}
