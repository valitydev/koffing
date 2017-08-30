import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { Event } from './model/event/event';

@Injectable()
export class EventService {

    private endpoint: string = `${this.config.capiUrl}/processing/invoices`;

    constructor(
        private http: Http,
        private config: ConfigService
    ) { }

    public getInvoiceEvents(invoiceID: string, limit: number, eventID?: number): Observable<Event[]> {
        const search = new URLSearchParams();
        search.set('limit', String(limit));
        if (eventID) {
            search.set('eventID', String(eventID));
        }
        return this.http.get(`${this.endpoint}/${invoiceID}/events`, {search}).map((res) => res.json());
    }
}
