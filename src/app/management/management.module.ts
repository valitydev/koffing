import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { DomainModule } from 'koffing/domain/domain.module';
import { SuggestionsModule } from 'koffing/suggestions/suggestions.module';
import { CreateShopComponent } from './create-shop/create-shop.component';
import { ManagementComponent } from './management.component';
import { ClaimDetailsComponent } from './claim-details/claim-details.component';
import { ClaimStatusPipe } from './claim-status.pipe';
import { ShopCreationDetailsComponent } from './claim-details/shop-creation-details/shop-creation-details.component';
import { ContractCreationDetailsComponent } from './claim-details/contract-creation-details/contract-creation-details.component';
import { PayoutToolCreationDetailsComponent } from './claim-details/payout-tool-creation-details/payout-tool-creation-details.component';
import { ContractBindingDetailsComponent } from './claim-details/contract-binding-details/contract-binding-details.component';
import { RevokeClaimComponent } from './claim-details/revoke-claim/revoke-claim.component';
import { ModificationTypePipe } from './modification-type.pipe';
import { ClaimModificationService } from './claim-modification.service';
import { ManagementService } from './management.service';
import { InitCreateShopComponent } from './init-create-shop/init-create-shop.component';
import { PaymentInstitutionService } from 'koffing/backend/payment-institution.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BackendModule,
        DomainModule,
        SuggestionsModule
    ],
    declarations: [
        ManagementComponent,
        CreateShopComponent,
        InitCreateShopComponent,
        ClaimStatusPipe,
        ClaimDetailsComponent,
        ShopCreationDetailsComponent,
        ContractCreationDetailsComponent,
        PayoutToolCreationDetailsComponent,
        ContractBindingDetailsComponent,
        RevokeClaimComponent,
        ModificationTypePipe
    ],
    providers: [
        ClaimModificationService,
        ManagementService,
        PaymentInstitutionService
    ]
})
export class ManagementModule { }
