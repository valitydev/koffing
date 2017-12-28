import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { KoffingHttp } from './koffing-http.service';
import { ConfigService } from './config.service';
import { Webhook } from './model';
import { WebhookParams } from './requests';

@Injectable()
export class WebhooksService {

    private endpoint = `${this.config.capiUrl}/processing/webhooks`;

    constructor(
        private http: KoffingHttp,
        private config: ConfigService
    ) { }

    public createWebhook(params: WebhookParams): Observable<Webhook> {
        return this.http.post(this.endpoint, params).map(res => res.json());
    }

    public getWebhooks(): Observable<Webhook[]> {
        return this.http.get(this.endpoint).map(res => res.json());
    }

    public getWebhookByID(webhookID: string): Observable<Webhook> {
        return this.http.get(`${this.endpoint}/${webhookID}`).map(res => res.json());
    }

    public deleteWebhookByID(webhookID: string): Observable<Webhook> {
        return this.http.delete(`${this.endpoint}/${webhookID}`).map(res => res.json());
    }
}
