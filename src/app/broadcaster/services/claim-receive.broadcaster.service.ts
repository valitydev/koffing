import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Broadcaster } from './broadcaster.service';

@Injectable()
export class ClaimReceiveBroadcaster {

    constructor(private broadcaster: Broadcaster) {}

    public fire() {
        this.broadcaster.broadcast(ClaimReceiveBroadcaster);
    }

    public on(): Observable<string> {
        return this.broadcaster.on<string>(ClaimReceiveBroadcaster);
    }
}
