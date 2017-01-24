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
import { CreateContractComponent } from './components/management-container/shops/create-shop-wizard/step1-contract/create-contract/create-contract.component';
import { CreatePayoutAccountComponent } from './components/management-container/shops/create-shop-wizard/step2-account/create-payout-account/create-payout-account.component';
import { SelectContractComponent } from './components/management-container/shops/create-shop-wizard/step1-contract/select-contract/select-contract.component';
import { SelectPayoutAccountComponent } from './components/management-container/shops/create-shop-wizard/step2-account/select-payout-account/select-payout-account.component';
import { AddShopComponent } from './components/management-container/shops/create-shop-wizard/step3-shop/add-shop/add-shop.component';
import { EditShopComponent } from './components/management-container/shops/edit-shop/edit-shop.component';
import { ContractViewComponent } from './components/management-container/contracts/contract-view/contract-view.component';
import { ContractCreateComponent } from './components/management-container/contracts/contract-create/contract-create.component';
import { PayoutAccountViewComponent } from './components/management-container/contracts/payout-account-view/payout-account-view.component';
import { PayoutAccountCreateComponent } from './components/management-container/contracts/payout-account-create/payout-account-create.component';
import { CreateShopWizardComponent } from './components/management-container/shops/create-shop-wizard/create-shop-wizard.component';
import { Step1ContractComponent } from './components/management-container/shops/create-shop-wizard/step1-contract/step1-contract.component';
import { Step2AccountComponent } from './components/management-container/shops/create-shop-wizard/step2-account/step2-account.component';
import { Step3ShopComponent } from './components/management-container/shops/create-shop-wizard/step3-shop/step3-shop.component';

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
        Step1ContractComponent,
        Step2AccountComponent,
        Step3ShopComponent
    ]
})
export class ManagementModule { }

export * from './classes/wizard-args.class';
export * from './components/management-container/shops/edit-shop/edit-shop.component';
export * from './components/management-container/shops/create-shop-wizard/create-shop-wizard.component';
