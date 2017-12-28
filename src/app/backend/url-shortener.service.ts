import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { UrlShortenerResult } from './model';
import { KoffingHttp } from './koffing-http.service';

@Injectable()
export class UrlShortenerService {

    constructor(private http: KoffingHttp,
                private config: ConfigService) {
    }

    public shorten(sourceUrl: string, expiresAt: string): Observable<UrlShortenerResult> {
        return this.http.post(`${this.config.shortenUrlEndpoint}/v1/shortened-urls`, {sourceUrl, expiresAt})
            .map(res => res.json());
    }
}
