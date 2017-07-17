import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { Shop } from './model/shop';
import { ConfigService } from './config.service';
import { ShopParams } from './requests/shop-request';
import { Shop as ShopNew } from 'koffing/backend/model/shop/shop';

@Injectable()
export class ShopService {

    private endpoint: string = `${this.config.capiUrl}/processing/shops`;

    constructor(private http: Http,
                private config: ConfigService) {
    }

    /**
     * @deprecated Use getShopsObs
     */
    public getShops(): Promise<Shop[]> {
        return this.http.get(this.endpoint)
            .toPromise()
            .then(response => response.json() as Shop[]);
    }

    /**
     * @deprecated Use getShopObs
     */
    public getShop(shopID: number): Promise<Shop> {
        return this.http.get(`${this.endpoint}/${shopID}`)
            .toPromise()
            .then(response => response.json() as Shop);
    }

    /**
     * @deprecated Use getShopObs
     */
    public getShopObservable(shopID: string): Observable<Shop> {
        return this.http.get(`${this.endpoint}/${shopID}`)
            .map((res) => res.json());
    }

    /**
     * @deprecated Use ClaimService
     */
    public createShop(args: ShopParams): Promise<string> {
        return this.http.post(this.endpoint, args)
            .toPromise()
            .then(response => response.json());
    }

    /**
     * @deprecated Use ClaimService
     */
    public updateShop(shopID: number, args: ShopParams): Promise<string> {
        return this.http.post(`${this.endpoint}/${shopID}`, args)
            .toPromise()
            .then(response => response.json());
    }

    /**
     * @deprecated Use activateShopObs
     */
    public activateShop(shopID: any): Promise<string> {
        return this.http.put(`${this.endpoint}/${shopID}/activate`, {})
            .toPromise()
            .then(response => response.json());
    }

    /**
     * @deprecated Use suspendShopObs
     */
    public suspendShop(shopID: any): Promise<string> {
        return this.http.put(`${this.endpoint}/${shopID}/suspend`, {})
            .toPromise()
            .then(response => response.json());
    }

    public getShopsObs(): Observable<ShopNew[]> {
        return this.http.get(this.endpoint).map((res) => res.json());
    }

    public getShopByID(shopID: string): Observable<ShopNew> {
        return this.http.get(`${this.endpoint}/${shopID}`).map((res) => res.json());
    }

    public activateShopObs(shopID: string): Observable<void> {
        return this.http.put(`${this.endpoint}/${shopID}/activate`, {}).map((res) => res.json());
    }

    public suspendShopObs(shopID: string): Observable<void> {
        return this.http.put(`${this.endpoint}/${shopID}/suspend`, {}).map((res) => res.json());
    }
}
