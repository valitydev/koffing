import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Shop } from 'koffing/backend/model/shop';
import { SelectItem } from 'koffing/common/select/select-item';
import { ShopIDStorage } from 'koffing/analytics/shop-id-storage.service';
import { ShopService } from 'koffing/backend/shop.service';

@Injectable()
export class AnalyticsService {

    private shops: Shop[];

    constructor(private shopService: ShopService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    public getShopItems(): Observable<SelectItem[]> {
        return Observable.fromPromise(this.shopService.getShops()).map((shops: Shop[]) => {
            this.shops = shops;
            return this.toShopItems(shops);
        });
    }

    public getActiveShopID(): number {
        const routeShopID = Number(this.route.snapshot.params['shopID']);
        return routeShopID ? routeShopID : this.getFromStorage(this.shops);
    }

    public navigateToShop(shopID: number) {
        ShopIDStorage.set(shopID);
        const hasChildren = this.route.children.length > 0;
        const childComponent = hasChildren ? this.route.children[0].routeConfig.path : 'dashboard';
        this.router.navigate(['analytics', shopID, childComponent]);
    }

    private toShopItems(shops: Shop[]): SelectItem[] {
        return shops.map((shop) => new SelectItem(shop.id, shop.details.name));
    }

    private getFromStorage(shops: Shop[]) {
        return ShopIDStorage.isAvailable(shops) ? ShopIDStorage.get() : this.shops[0].id;
    }
}
