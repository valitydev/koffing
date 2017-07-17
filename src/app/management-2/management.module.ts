import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { SuggestionsModule } from 'koffing/suggestions/suggestions.module';
import { ManagementRoutingModule } from './management-routing.module';
import { CreateShopComponent } from './create-shop/create-shop.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { ShopGroupComponent } from './shop-form/shop-form.component';
import { BankAccountFormComponent } from './bank-account-form/bank-account-form.component';
import { ManagementComponent } from './management.component';
import { ClaimService } from 'koffing/backend/claim.service';
import { ClaimStatusPipe } from 'koffing/management-2/claim-status.pipe';

@NgModule({
    imports: [
        ManagementRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BackendModule,
        SuggestionsModule
    ],
    declarations: [
        ManagementComponent,
        CreateShopComponent,
        ContractFormComponent,
        ShopGroupComponent,
        BankAccountFormComponent,
        ClaimStatusPipe
    ],
    providers: [ClaimService]
})
export class ManagementModule { }
