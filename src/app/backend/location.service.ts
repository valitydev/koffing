import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { isNil } from 'lodash';

import { CapiHttp } from 'koffing/backend/capi-http.service';
import { ConfigService } from './config.service';
import { LocationName } from './model/location-name';

@Injectable()
export class LocationService {

    constructor(
        private http: CapiHttp,
        private config: ConfigService
    ) { }

    public getLocationsNames(geoIDs: string[], language?: string): Observable<LocationName[]> {
        if (isNil(geoIDs) || geoIDs.length === 0) {
            return Observable.create((observer: Observer<LocationName[]>) => {
                observer.next([]);
                observer.complete();
            });
        }
        const search = new URLSearchParams();
        search.set('geoIDs', geoIDs.join(','));
        search.set('language', language || 'ru');
        return this.http.get(`${this.config.capiUrl}/reference/geo/location/names`, {search}).map((res) => res.json());
    }
}
