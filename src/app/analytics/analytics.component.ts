import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'koffing/common/components/select/select.class';
import { AnalyticsService } from 'koffing/analytics/analytics.service';

@Component({
    selector: 'kof-analytics',
    templateUrl: './analytics.component.pug',
    providers: [AnalyticsService],
    styles: [`
        .shop-selector {
            padding-bottom: 10px;
        }
    `]
})
export class AnalyticsComponent implements OnInit {

    public currentShopID: number;
    public shopItems: SelectItem[] = [];
    public isLoading: boolean = true;

    constructor(private analyticsService: AnalyticsService) { }

    public ngOnInit() {
        this.analyticsService.getShopItems().subscribe((shopItems: SelectItem[]) => {
            this.isLoading = false;
            this.currentShopID = this.analyticsService.getActiveShopID();
            this.shopItems = shopItems;
            this.navigate();
        });
    }

    public navigate() {
        this.analyticsService.navigateToShop(this.currentShopID);
    }
}
