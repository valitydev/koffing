import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Shop } from '../classes/shop.class';
import { ConfigService } from './config.service';

@Injectable()
export class ShopService {

    constructor(private http: Http, private config: ConfigService) { }

    public getShops(): Promise<Shop[]> {
        return this.http.get(`${this.config.capiUrl}/processing/me`)
            .toPromise()
            .then(response => response.json().shops as Shop[]);
    }

    public createShop(args: any): Promise<string> {
        const params = {
            categoryRef: Number(args.categoryRef),
            shopDetails: args.shopDetails,
            contractor: args.contractor
        };
        return this.http.post(`${this.config.capiUrl}/processing/shops`, params)
            .toPromise()
            .then(response => response.json());
    }

    public updateShop(shopID: any, args: any): Promise<string> {
        const url = `${this.config.capiUrl}/processing/shops/${shopID}`;
        const params = {
            categoryRef: Number(args.categoryRef),
            shopDetails: args.shopDetails,
            contractor: args.contractor
        };
        return this.http.post(url, params)
            .toPromise()
            .then(response => response.json());
    }

    public activateShop(shopID: any): Promise<string> {
        const url = `${this.config.capiUrl}/processing/shops/${shopID}/activate`;
        const params = {};
        return this.http.put(url, params)
            .toPromise()
            .then(response => response.json());
    }
}
