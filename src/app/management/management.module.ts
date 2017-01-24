import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ManagementRoutingModule } from './management-routing.module';
import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { ManagementComponent } from './components/management-container/management.component';
import { ClaimsComponent } from './components/management-container/claims/claims.component';
import { ShopCreationComponent } from './components/management-container/claims/shop-creation/shop-creation.component';
import { ShopModificationComponent } from './components/management-container/claims/shop-modification/shop-modification.component';
import { ModificationDetailComponent } from './components/management-container/claims/modification-detail/modification-detail.component';
import { ShopAccountCreationComponent } from './components/management-container/claims/shop-account-creation/shop-account-creation.component';
import { ShopSuspensionComponent } from './components/management-container/claims/shop-suspension/shop-suspension.component';
import { ContractCreationComponent } from './components/management-container/claims/contract-creation/contract-creation.component';
import { PayoutAccountCreationComponent } from 'koffing/management/components/management-container/claims/payout-account-creation/payout-account-creation.component';
import { ShopsComponent } from './components/management-container/shops/shops.component';
import { CreateShopComponent } from './components/management-container/shops/create-shop/create-shop.component';
import { AddShopComponent } from './components/management-container/shops/create-shop/add-shop/add-shop.component';
import { EditShopComponent } from './components/management-container/shops/edit-shop/edit-shop.component';
import { SelectContractComponent } from './components/management-container/shops/create-shop/select-contract/select-contract.component';
import { SelectPayoutAccountComponent } from './components/management-container/shops/create-shop/select-payout-account/select-payout-account.component';
import { ContractsComponent } from './components/management-container/contracts/contracts.component';
import { ContractViewComponent } from './components/management-container/contracts/contract-view/contract-view.component';
import { ContractCreateComponent } from './components/management-container/contracts/contract-create/contract-create.component';
import { PayoutAccountViewComponent } from 'koffing/management/components/management-container/contracts/payout-account-view/payout-account-view.component';
import { PayoutAccountCreateComponent } from 'koffing/management/components/management-container/contracts/payout-account-create/payout-account-create.component';
import { CreatePayoutAccountComponent } from './components/management-container/create-payout-account/create-payout-account.component';

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
        ShopAccountCreationComponent,
        ShopSuspensionComponent,
        ContractCreationComponent,
        PayoutAccountCreationComponent,
        ShopsComponent,
        CreateShopComponent,
        AddShopComponent,
        EditShopComponent,
        SelectContractComponent,
        SelectPayoutAccountComponent,
        ContractsComponent,
        ContractViewComponent,
        ContractCreateComponent,
        PayoutAccountViewComponent,
        PayoutAccountCreateComponent,
        CreatePayoutAccountComponent,
    ]
})
export class ManagementModule {}
