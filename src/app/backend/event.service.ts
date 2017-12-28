import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import { Event } from './model';

@Injectable()
export class EventService {

    private endpoint: string = `${this.config.capiUrl}/processing/invoices`;

    constructor(
        private http: KoffingHttp,
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
