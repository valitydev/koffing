import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { ShopService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';
import { ShopIDStorage } from 'koffing/analytics/components/analytic-selection/shop-id-storage.service';

@Component({
    selector: 'kof-analytic-selection',
    templateUrl: './analytic-selection.component.pug'
})
export class AnalyticSelectionComponent implements OnInit {

    public currentShopID: number;
    public shopItems: SelectItem[] = [];
    public isLoading: boolean = true;
    private shops: Shop[] = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private shopService: ShopService) {
    }

    public ngOnInit() {
        this.shopService.getShops().then((shops: Shop[]) => {
            this.isLoading = false;
            this.shops = shops;
            this.shopItems = _.map(shops, (shop) => new SelectItem(shop.id, shop.details.name));
            const routeShopID = Number(this.route.snapshot.params['shopID']);
            this.currentShopID = routeShopID ? routeShopID : this.getFromStorage();
            this.navigate();
        });
    }

    public navigate() {
        ShopIDStorage.set(this.currentShopID);
        this.navigateToShop();
    }

    private navigateToShop() {
        const hasChildren = this.route.children.length > 0;
        const childComponent = hasChildren ? this.route.children[0].routeConfig.path : 'dashboard';
        this.router.navigate(['analytics', this.currentShopID, childComponent]);
    }

    private getFromStorage() {
        return ShopIDStorage.isAvailable(this.shops) ? ShopIDStorage.get() : this.shopItems[0].value;
    }
}
