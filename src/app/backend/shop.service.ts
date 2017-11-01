import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CapiHttp } from './capi-http.service';
import { ConfigService } from './config.service';
import { Shop } from './model';

@Injectable()
export class ShopService {

    private endpoint: string = `${this.config.capiUrl}/processing/shops`;

    constructor(
        private http: CapiHttp,
        private config: ConfigService
    ) { }

    public getShops(): Observable<Shop[]> {
        return this.http.get(this.endpoint).map((res) => res.json());
    }

    public getShopByID(shopID: string): Observable<Shop> {
        return this.http.get(`${this.endpoint}/${shopID}`).map((res) => res.json());
    }

    public activateShop(shopID: string): Observable<void> {
        return this.http.put(`${this.endpoint}/${shopID}/activate`, {}).map((res) => res.json());
    }

    public suspendShop(shopID: string): Observable<void> {
        return this.http.put(`${this.endpoint}/${shopID}/suspend`, {}).map((res) => res.json());
    }
}
