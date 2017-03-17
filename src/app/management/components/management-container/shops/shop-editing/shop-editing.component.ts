import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ShopService } from 'koffing/backend/services/shop.service';
import { Shop } from 'koffing/backend/classes/shop.class';
import { ShopParams } from 'koffing/backend/classes/shop-params.class';
import { ShopEditingTransfer } from 'koffing/management/components/management-container/shops/shop-editing/edit-shop/shop-editing-transfer.class';

@Component({
    selector: 'kof-shop-editing',
    templateUrl: 'shop-editing.component.pug'
})
export class ShopEditingComponent implements OnInit {

    public shopID: number = Number(this.route.snapshot.params['shopID']);
    public isLoading: boolean = false;
    public shop: Shop;
    public shopEditing: ShopParams;
    public shopEditingReady: boolean = false;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shopService: ShopService
    ) { }

    public ngOnInit() {
        this.loadShop();
    }

    public loadShop() {
        this.isLoading = true;
        this.shopService.getShop(this.shopID).then((shop: Shop) => {
            this.shop = shop;
            this.isLoading = false;
        });
    }

    public updateShop() {
        if (this.shopEditingReady) {
            this.isLoading = true;
            this.shopService.updateShop(this.shopID, this.shopEditing).then(() => {
                this.isLoading = false;
                this.router.navigate(['/management']);
            });
        }
    }

    public onShopEditingChange(transfer: ShopEditingTransfer) {
        this.shopEditing = transfer.shopEditing;
        this.shopEditingReady = transfer.valid && transfer.dirty;
    }

}
