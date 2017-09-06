import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { clone, find } from 'lodash';

import { Event, InvoiceChange, InvoiceStatusChanged, PaymentStatusChanged } from 'koffing/backend';
import { EventService } from 'koffing/backend/event.service';

@Injectable()
export class EventPollerService {

    private interval: number = 300;
    private retries: number = 60;
    private limitStartEvents: number = 100;

    constructor(
        private eventService: EventService,
    ) { }

    public startPolling(invoiceID: string, expectedChange: InvoiceChange): Observable<InvoiceChange> {
        return Observable.create((observer: Observer<InvoiceChange>) => {
            let i = 0;
            let lastEvent = new Event();
            const interval = setInterval(() => {
                this.getNextLastEvent(invoiceID, lastEvent.id).subscribe((event) => {
                    if (event) {
                        lastEvent = clone(event);
                    }

                    const targetChange = this.findTargetChange(lastEvent.changes, expectedChange);
                    if (targetChange) {
                        clearInterval(interval);
                        observer.next(targetChange);
                        observer.complete();
                    }

                    if (++i >= this.retries) {
                        clearInterval(interval);
                        observer.error({ message: 'completed by timeout' });
                        observer.complete();
                    }
                });
            }, this.interval);
        });
    }

    private findTargetChange(changes: InvoiceChange[], expectedChange: InvoiceChange): InvoiceChange {
        return find(changes, (change) => {
            if (change.changeType === expectedChange.changeType) {
                if (expectedChange instanceof InvoiceStatusChanged) {
                    const eventChange = change as InvoiceStatusChanged;
                    if (expectedChange.status === eventChange.status) {
                        return true;
                    }
                } else
                if (expectedChange instanceof PaymentStatusChanged) {
                    const eventChange = change as PaymentStatusChanged;
                    if (expectedChange.status === eventChange.status) {
                        return true;
                    }
                }
            }
        });
    }

    private getNextLastEvent(invoiceID: string, currentLastEventID?: number): Observable<Event> {
        if (currentLastEventID || currentLastEventID === 0) {
            return this.eventService.getInvoiceEvents(invoiceID, 2, currentLastEventID).map((events) => events[0]);
        } else {
            return this.eventService.getInvoiceEvents(invoiceID, this.limitStartEvents).map((events) => this.filterLastEvent(events));
        }
    }

    private filterLastEvent(events: Event[]) {
        return events && events.length > 0 ? events[events.length - 1] : null;
    }
}
