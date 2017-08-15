import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { Shop } from 'koffing/backend/model/shop/shop';

@Injectable()
export class ShopService {

    private endpoint: string = `${this.config.capiUrl}/processing/shops`;

    constructor(private http: Http,
                private config: ConfigService) {
    }

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
