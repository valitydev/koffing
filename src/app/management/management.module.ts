import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ManagementRoutingModule } from './management-routing.module';
import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { ManagementComponent } from './components/management-container/management.component';
import { ClaimsComponent } from './components/management-container/claims/claims.component';
import { ModificationDetailComponent } from './components/management-container/claims/modification-detail/modification-detail.component';
import { ShopModificationComponent } from './components/management-container/claims/shop-modification/shop-modification.component';
import { ShopCreationComponent } from './components/management-container/claims/shop-creation/shop-creation.component';
import { ShopsComponent } from './components/management-container/shops/shops.component';
import { ContractsComponent } from './components/management-container/contracts/contracts.component';
import { CreateContractComponent } from 'koffing/management/components/management-container/create-contract/create-contract.component';
import { CreatePayoutAccountComponent }
    from 'koffing/management/components/management-container/create-payout-account/create-payout-account.component';
import { SelectContractComponent }
    from 'koffing/management/components/management-container/shops/create-shop/select-contract/select-contract.component';
import { SelectPayoutAccountComponent }
    from 'koffing/management/components/management-container/shops/create-shop/select-payout-account/select-payout-account.component';
import { CreateShopComponent } from 'koffing/management/components/management-container/shops/create-shop/create-shop.component';
import { AddShopComponent } from 'koffing/management/components/management-container/shops/create-shop/add-shop/add-shop.component';
import { EditShopComponent } from 'koffing/management/components/management-container/shops/edit-shop/edit-shop.component';

@NgModule({
    imports: [
        ManagementRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        BackendModule
    ],
    declarations: [
        ManagementComponent,
        ClaimsComponent,
        ShopCreationComponent,
        ShopModificationComponent,
        ModificationDetailComponent,
        ShopsComponent,
        ContractsComponent,
        CreateContractComponent,
        CreatePayoutAccountComponent,
        SelectContractComponent,
        SelectPayoutAccountComponent,
        CreateShopComponent,
        AddShopComponent,
        EditShopComponent
    ]
})
export class ManagementModule {}

export * from './classes/shop-args.class';
export * from './components/management-container/shops/edit-shop/edit-shop.component';
export * from './components/management-container/shops/create-shop/create-shop.component';