import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { UrlShortenerResult } from './model';

@Injectable()
export class UrlShortenerService {

    constructor(private http: Http,
                private config: ConfigService) {
    }

    public shorten(uri: string): Observable<UrlShortenerResult> {
        return this.http.post(this.config.urlShortenerEndpoint, {uri})
            .map(res => res.json());
    }
}
