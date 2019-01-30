import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export class Broadcaster {
    private eventBus: Subject<any>;

    constructor() {
        this.eventBus = new Subject<any>();
    }

    public broadcast(key: any, data?: any) {
        this.eventBus.next({ key, data });
    }

    public on<T>(key: any): Observable<T> {
        return this.eventBus
            .asObservable()
            .filter(event => event.key === key)
            .map((event: any) => <T>event.data);
    }
}
