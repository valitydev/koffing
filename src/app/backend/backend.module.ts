import { NgModule } from '@angular/core';

import { CategoryService } from './category.service';
import { ContractService } from './contract.service';
import { PayoutToolService } from './payout-tool.service';
import { ShopService } from './shop.service';
import { ConfigService } from './config.service';
import { WebhooksService } from './webhooks.service';
import { AnalyticsService } from './analytics.service';
import { LocationService } from './location.service';
import { AccountsService } from './accounts.service';
import { SearchService } from './search.service';
import { InvoiceService } from './invoice.service';
import { EventService } from './event.service';
import { UrlShortenerService } from './url-shortener.service';
import { ClaimService } from './claim.service';
import { CustomerService } from './customer.service';

@NgModule({
    providers: [
        AccountsService,
        CategoryService,
        ContractService,
        PayoutToolService,
        ShopService,
        ConfigService,
        AnalyticsService,
        LocationService,
        SearchService,
        WebhooksService,
        InvoiceService,
        EventService,
        UrlShortenerService,
        ClaimService,
        CustomerService
    ]
})
export class BackendModule { }
