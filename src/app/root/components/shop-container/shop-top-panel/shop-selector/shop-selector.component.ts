import { Component, OnInit } from '@angular/core';

import { ShopSelectorService } from './shop-selector.service';
import { SelectItem } from './select-item';

@Component({
    selector: 'kof-shop-selector',
    templateUrl: 'shop-selector.component.pug',
    styleUrls: ['shop-selector.component.less'],
    providers: [ShopSelectorService]
})
export class ShopSelectorComponent implements OnInit {

    public selectorItems: SelectItem[];

    private selectedShopID: string;

    constructor(private shopSelectorService: ShopSelectorService) {}

    get selected() {
        return this.selectedShopID;
    }

    set selected(shopID: string) {
        this.selectedShopID = shopID;
        this.shopSelectorService.navigateToShop(shopID);
    }

    public ngOnInit() {
        this.shopSelectorService.getSelectorItems().subscribe((items) => {
            this.selectorItems = items;
            this.selectedShopID = this.shopSelectorService.getActiveShopID();
        });
    }
}
