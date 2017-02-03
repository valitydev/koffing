import { NgModule } from '@angular/core';

import { AccountService } from './services/accounts.service';
import { CategoryService } from './services/category.service';
import { ClaimService } from './services/claim.service';
import { ContractService } from './services/contract.service';
import { CustomerService } from './services/customer.service';
import { InvoiceService } from './services/invoice.service';
import { PaymentsService } from './services/payments.service';
import { PayoutAccountService } from './services/payout-account.service';
import { ShopService } from './services/shop.service';
import { ConfigService } from './services/config.service';
import { GeolocationService } from './services/geolocation.service';

@NgModule({
    providers: [
        AccountService,
        CategoryService,
        ClaimService,
        ContractService,
        CustomerService,
        InvoiceService,
        PaymentsService,
        PayoutAccountService,
        ShopService,
        ConfigService,
        GeolocationService
    ]
})
export class BackendModule { }

export * from './services/accounts.service';
export * from './services/category.service';
export * from './services/claim.service';
export * from './services/config.service';
export * from './services/contract.service';
export * from './services/customer.service';
export * from './services/invoice.service';
export * from './services/payments.service';
export * from './services/payout-account.service';
export * from './services/shop.service';
export * from './services/geolocation.service';

export * from './classes/bank-account.class';
export * from './classes/category.class';
export * from './classes/claim.class';
export * from './classes/contract.class';
export * from './classes/contractor.class';
export * from './classes/conversion.class';
export * from './classes/entity.class';
export * from './classes/geodata.class';
export * from './classes/invoice.class';
export * from './classes/payout-account.class';
export * from './classes/payout-tool.class';
export * from './classes/payout-tool-bank-account.class';
export * from './classes/request-params.class';
export * from './classes/revenue.class';
export * from './classes/russian-legal-entity.class';
export * from './classes/shop.class';
export * from './classes/shop-detail.class';
export * from './classes/shop-item.class';
export * from './classes/location-name.class';
