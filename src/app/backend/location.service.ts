import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { isNil } from 'lodash';

import { ConfigService } from 'koffing/backend/services/config.service';
import { LocationName } from 'koffing/backend/model/location-name.class';

@Injectable()
export class LocationService {

    constructor(private http: Http,
                private config: ConfigService) {
    }

    public getLocationsNames(geoIDs: string[], language?: string): Observable<LocationName[]> {
        if (isNil(geoIDs) || geoIDs.length === 0) {
            return Observable.create((observer: Observer<LocationName[]>) => {
                observer.next([]);
                observer.complete();
            });
        }
        const params = new URLSearchParams();
        params.set('geoIDs', geoIDs.join(','));
        params.set('language', language || 'ru');
        return this.http.get(`${this.config.capiUrl}/reference/geo/location/names`, {search: params}).map((res) => res.json());
    }
}
