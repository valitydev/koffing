import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Shop } from '../classes/shop.class';
import { ConfigService } from './config.service';

@Injectable()
export class ShopService {

    private shopsUrl: string = `${this.config.capiUrl}/processing/shops`;

    constructor(private http: Http, private config: ConfigService) {}

    public getShops(): Promise<Shop[]> {
        return this.http.get(this.shopsUrl)
            .toPromise()
            .then(response => response.json() as Shop[]);
    }

    public createShop(args: any): Promise<string> {
        const params = {
            categoryRef: Number(args.categoryRef),
            shopDetails: args.shopDetails,
            contractID: Number(args.contractID),
            payoutAccountID: Number(args.payoutAccountID),
            callbackUrl: args.callbackHandler.url
        };
        return this.http.post(this.shopsUrl, params)
            .toPromise()
            .then(response => response.json());
    }

    public updateShop(shopID: any, args: any): Promise<string> {
        const params = {
            categoryRef: Number(args.categoryRef),
            shopDetails: args.shopDetails,
            contractID: Number(args.contractId),
            payoutAccountID: Number(args.payoutAccountId),
            callbackUrl: args.callbackHandlerUrl
        };
        return this.http.post(`${this.shopsUrl}/${shopID}`, params)
            .toPromise()
            .then(response => response.json());
    }

    public activateShop(shopID: any): Promise<string> {
        return this.http.put(`${this.shopsUrl}/${shopID}/activate`, {})
            .toPromise()
            .then(response => response.json());
    }

    public suspendShop(shopID: any): Promise<string> {
        return this.http.put(`${this.shopsUrl}/${shopID}/suspend`, {})
            .toPromise()
            .then(response => response.json());
    }
}
