import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { SuggestionsModule } from 'koffing/suggestions/suggestions.module';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractViewComponent } from './contracts/contract-view/contract-view.component';
import { ContractCreateComponent } from './contracts/contract-create/contract-create.component';
import { PayoutToolsComponent } from './contracts/payout-tools/payout-tools.component';
import { PayoutToolViewComponent } from './contracts/payout-tool-view/payout-tool-view.component';
import { PayoutToolCreateComponent } from './contracts/payout-tool-create/payout-tool-create.component';
import { ShopsComponent } from './shops/shops.component';
import { AddShopComponent } from './shops/create-shop-wizard/selection-shop-fields/add-shop/add-shop.component';
import { EditShopComponent } from './shops/shop-editing/edit-shop/edit-shop.component';
import { ShopEditingComponent } from './shops/shop-editing/shop-editing.component';
import { SelectionShopComponent } from './shops/create-shop-wizard/selection-shop-fields/selection-shop-fields.component';
import { CreateContractComponent } from './shops/create-shop-wizard/selection-contract/create-contract/create-contract.component';
import { CreatePayoutToolComponent } from './shops/create-shop-wizard/selection-paytool/create-paytool/create-paytool.component';
import { SelectContractComponent } from './shops/create-shop-wizard/selection-contract/select-contract/select-contract.component';
import { SelectPaytoolComponent } from './shops/create-shop-wizard/selection-paytool/select-paytool/select-paytool.component';
import { CreateShopWizardComponent } from './shops/create-shop-wizard/create-shop-wizard.component';
import { SelectionContractComponent } from './shops/create-shop-wizard/selection-contract/selection-contract.component';
import { SelectionPaytoolComponent } from './shops/create-shop-wizard/selection-paytool/selection-paytool.component';
import { ShopDetailsPanelComponent } from './shops/shop-details-panel/shop-details-panel.component';
import { PaytoolDecisionService } from './shops/create-shop-wizard/selection-paytool/paytool-decision.service';
import { ClaimsComponent } from './claims/claims.component';
import { ShopAccountCreationComponent } from './claims/shop-account-creation/shop-account-creation.component';
import { ContractCreationComponent } from './claims/contract-creation/contract-creation.component';
import { PayoutToolCreationComponent } from './claims/payout-tool-creation/payout-tool-creation.component';
import { ModificationDetailComponent } from './claims/modification-detail/modification-detail.component';
import { ShopModificationComponent } from './claims/shop-modification/shop-modification.component';
import { ClaimsEditComponent } from './claims/claims-edit/claims-edit.component';
import { ClaimService } from './shared/claim.service';

@NgModule({
    imports: [
        ManagementRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        BackendModule,
        SuggestionsModule
    ],
    declarations: [
        ManagementComponent,
        ClaimsComponent,
        ShopModificationComponent,
        ModificationDetailComponent,
        ShopAccountCreationComponent,
        ContractCreationComponent,
        PayoutToolCreationComponent,
        ShopsComponent,
        ContractsComponent,
        CreateContractComponent,
        CreatePayoutToolComponent,
        SelectContractComponent,
        SelectPaytoolComponent,
        AddShopComponent,
        EditShopComponent,
        SelectContractComponent,
        SelectPaytoolComponent,
        ContractsComponent,
        ContractViewComponent,
        ContractCreateComponent,
        PayoutToolsComponent,
        PayoutToolViewComponent,
        PayoutToolCreateComponent,
        CreatePayoutToolComponent,
        CreateShopWizardComponent,
        SelectionContractComponent,
        SelectionPaytoolComponent,
        SelectionShopComponent,
        ShopDetailsPanelComponent,
        ClaimsEditComponent,
        ShopEditingComponent
    ],
    providers: [
        PaytoolDecisionService,
        ClaimService
    ]
})
export class ManagementModule { }
