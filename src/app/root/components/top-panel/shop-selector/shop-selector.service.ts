import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

import { ShopService } from 'koffing/backend/shop.service';
import { Shop } from 'koffing/backend';
import { SelectItem } from './select-item';
import { ShopIDStorage } from './shop-id-storage.service';

@Injectable()
export class ShopSelectorService {
    private shops: Shop[];

    constructor(
        private shopService: ShopService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    public getSelectorItems(): Observable<SelectItem[]> {
        return this.shopService.getShops().map((shops: Shop[]) => {
            this.shops = shops;
            return this.toSelectorItems(shops);
        });
    }

    public getActiveShopID(): string {
        const routeShopID = this.route.snapshot.params['shopID'];
        return routeShopID ? routeShopID : '';
    }

    public navigateToShop(shopID: string) {
        ShopIDStorage.set(shopID);
        let childRoute = ['invoices'];
        if (
            this.route.children.length &&
            this.route.children[0].parent.routeConfig.path === 'shops'
        ) {
            childRoute = this.route.children[0].routeConfig.path.split('/');
        }
        this.router.navigate(['shop', shopID].concat(childRoute));
    }

    private toSelectorItems(shops: Shop[]): SelectItem[] {
        return shops.map(shop => new SelectItem(shop.id, shop.details.name));
    }

    private getFromStorage(shops: Shop[]) {
        return ShopIDStorage.isAvailable(shops) ? ShopIDStorage.get() : this.shops[0].id;
    }
}
