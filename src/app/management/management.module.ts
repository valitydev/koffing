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
import { ShopAccountCreationComponent } from './components/management-container/claims/shop-account-creation/shop-account-creation.component';
import { ShopSuspensionComponent } from './components/management-container/claims/shop-suspension/shop-suspension.component';
import { ContractCreationComponent } from './components/management-container/claims/contract-creation/contract-creation.component';
import { PayoutAccountCreationComponent } from './components/management-container/claims/payout-account-creation/payout-account-creation.component';
import { CreateContractComponent } from './components/management-container/shops/selection-contract/create-contract/create-contract.component';
import { CreatePayoutAccountComponent } from './components/management-container/shops/selection-account/create-payout-account/create-payout-account.component';
import { SelectContractComponent } from './components/management-container/shops/selection-contract/select-contract/select-contract.component';
import { SelectPayoutAccountComponent } from './components/management-container/shops/selection-account/select-payout-account/select-payout-account.component';
import { AddShopComponent } from './components/management-container/shops/selection-shop-fields/add-shop/add-shop.component';
import { EditShopComponent } from './components/management-container/shops/edit-shop/edit-shop.component';
import { ContractViewComponent } from './components/management-container/contracts/contract-view/contract-view.component';
import { ContractCreateComponent } from './components/management-container/contracts/contract-create/contract-create.component';
import { PayoutAccountViewComponent } from './components/management-container/contracts/payout-account-view/payout-account-view.component';
import { PayoutAccountCreateComponent } from './components/management-container/contracts/payout-account-create/payout-account-create.component';
import { CreateShopWizardComponent } from './components/management-container/shops/create-shop-wizard/create-shop-wizard.component';
import { SelectionContractComponent } from './components/management-container/shops/selection-contract/selection-contract.component';
import { SelectionAccountComponent } from './components/management-container/shops/selection-account/selection-account.component';
import { SelectionShopComponent } from './components/management-container/shops/selection-shop-fields/selection-shop-fields.component';
import { EditShopContractComponent } from 'koffing/management/components/management-container/shops/edit-shop/edit-shop-contract/edit-shop-contract.component';
import { EditShopPayoutAccountComponent } from 'koffing/management/components/management-container/shops/edit-shop/edit-shop-payout-account/edit-shop-payout-account.component';

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
        ContractsComponent,
        CreateContractComponent,
        CreatePayoutAccountComponent,
        SelectContractComponent,
        SelectPayoutAccountComponent,
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
        CreateShopWizardComponent,
        SelectionContractComponent,
        SelectionAccountComponent,
        SelectionShopComponent,
        EditShopContractComponent,
        EditShopPayoutAccountComponent
    ]
})
export class ManagementModule { }

export * from './classes/shop-modification-args.class';
export * from './components/management-container/shops/edit-shop/edit-shop.component';
export * from './components/management-container/shops/create-shop-wizard/create-shop-wizard.component';
export * from './components/management-container/shops/edit-shop/edit-shop-contract/edit-shop-contract.component';
export * from './components/management-container/shops/edit-shop/edit-shop-payout-account/edit-shop-payout-account.component';
