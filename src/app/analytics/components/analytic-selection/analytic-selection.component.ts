import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { ShopService } from 'koffing/backend/backend.module';
import { Shop } from 'koffing/backend/backend.module';
import { SelectItem } from 'koffing/common/common.module';

@Component({
    selector: 'kof-analytic-selection',
    templateUrl: './analytic-selection.component.pug'
})
export class AnalyticSelectionComponent implements OnInit {

    public currentShopID: number;
    public shopItems: SelectItem[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shopService: ShopService
    ) { }

    public ngOnInit() {
        this.shopService.getShops().then((shops: Shop[]) => {
            const routeShopID = Number(this.route.snapshot.params['shopID']);
            this.shopItems = _.map(shops, (shop: Shop) => new SelectItem(shop.id, shop.details.name));
            this.currentShopID = routeShopID ? routeShopID : this.shopItems[0].value;
            this.navigateToShop();
        });
    }

    public navigateToShop() {
        const hasChildren = this.route.children.length > 0;
        const childComponent = hasChildren ? this.route.children[0].routeConfig.path : 'dashboard';
        this.router.navigate(['analytics', this.currentShopID, childComponent]);
    }
}
