import { NgModule } from '@angular/core';

import { CategoryService } from './services/category.service';
import { ContractService } from './services/contract.service';
import { ShopService } from './services/shop.service';
import { ConfigService } from './services/config.service';
import { WebhooksService } from './webhooks.service';
import { AnalyticsService } from 'koffing/backend/analytics.service';
import { LocationService } from 'koffing/backend/location.service';
import { AccountsService } from 'koffing/backend/accounts.service';
import { SearchService } from 'koffing/backend/search.service';

@NgModule({
    providers: [
        AccountsService,
        CategoryService,
        ContractService,
        ShopService,
        ConfigService,
        AnalyticsService,
        LocationService,
        SearchService,
        WebhooksService
    ]
})
export class BackendModule { }

export * from './services/category.service';
export * from './services/config.service';
export * from './services/contract.service';
export * from './services/shop.service';
export * from './webhooks.service';

export * from './classes/account.class';
export * from './classes/bank-account.class';
export * from './classes/category.class';
export * from './classes/contract.class';
export * from './classes/contractor.class';
export * from './classes/conversion.class';
export * from './classes/legal-entity.class';
export * from './classes/payout-tool.class';
export * from './classes/payout-tool-params.class';
export * from './classes/payout-tool-bank-account.class';
export * from './classes/revenue.class';
export * from './classes/russian-legal-entity.class';
export * from './classes/shop.class';
export * from './classes/shop-details.class';
export * from './classes/shop-item.class';
export * from './classes/shop-location.class';
export * from './classes/shop-params.class';
