import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShopDetailsComponent } from '../shop-info/shop-details/shop-details.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractorDetailsComponent } from './contractor-details/contractor-details.component';
import { BankAccountDetailsComponent } from './bank-account-details/bank-account-details.component';
import { PayoutToolDetailsComponent } from './payout-tool-details/payout-tool-details.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { PayoutToolFormComponent } from './payout-tool-form/payout-tool-form.component';
import { BankAccountFormComponent } from './bank-account-form/bank-account-form.component';
import { ShopFormService } from './shop-form/shop-form.service';
import { ContractFormService } from './contract-form/contract-form.service';
import { PayoutToolFormService } from './payout-tool-form/payout-tool-form.service';
import { BankAccountFormService } from './bank-account-form/bank-account-form.service';
import { RussianContractFormComponent } from './contract-form/russian-contract-form/russian-contract-form.component';
import { InternationalContractFormComponent } from './contract-form/international-contract-form/international-contract-form.component';
import { InternationalContractFormService } from './contract-form/international-contract-form/international-contract-form.service';
import { RussianContractFormService } from './contract-form/russian-contract-form/russian-contract-form.service';
import { InternationalBankAccountFormService } from './bank-account-form/international-bank-account-form/international-bank-account-form.service';
import { RussianBankAccountFormService } from './bank-account-form/russian-bank-account-form/russian-bank-account-form.service';
import { InternationalBankAccountFormComponent } from './bank-account-form/international-bank-account-form/international-bank-account-form.component';
import { RussianBankAccountFormComponent } from './bank-account-form/russian-bank-account-form/russian-bank-account-form.component';
import { InternationalBankAccountDetailsComponent } from './international-bank-account-details/international-bank-account-details.component';
import { RussianContractorDetailsComponent } from './contractor-details/russian-contractor-details/russian-contractor-details.component';
import { InternationalContractorDetailsComponent } from './contractor-details/international-contractor-details/international-contractor-details.component';
import { CommonModule } from '../common/common.module';
import { InternationalBankAccountPartFormComponent } from './bank-account-form/international-bank-account-part-form/international-bank-account-part-form.component';
import { ShopDetailsChangeComponent } from 'koffing/domain/shop-details-change/shop-details-change.component';
import { ShopCreationComponent } from 'koffing/domain/shop-creation/shop-creation.component';
import { ShopCategoryChangeComponent } from 'koffing/domain/shop-category-change/shop-category-change.component';
import { ShopLocationChangeComponent } from 'koffing/domain/shop-location-change/shop-location-change.component';
import { ContractTerminationComponent } from 'koffing/domain/contract-termination/contract-termination.component';
import { ShopAccountCreationComponent } from 'koffing/domain/shop-account-creation/shop-account-creation.component';
import { ShopPayoutScheduleChangeComponent } from 'koffing/domain/shop-payout-schedule-change/shop-payout-schedule-change.component';
import { ContractLegalAgreementBindingComponent } from 'koffing/domain/contract-legal-agreement-binding/contract-legal-agreement-binding.component';
import { ContractAdjustmentCreationComponent } from 'koffing/domain/contract-adjustment-creation/contract-adjustment-creation.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
    declarations: [
        ShopDetailsComponent,
        ContractDetailsComponent,
        ContractorDetailsComponent,
        RussianContractorDetailsComponent,
        InternationalContractorDetailsComponent,
        BankAccountDetailsComponent,
        InternationalBankAccountDetailsComponent,
        PayoutToolDetailsComponent,
        ShopFormComponent,
        ContractFormComponent,
        RussianContractFormComponent,
        InternationalContractFormComponent,
        PayoutToolFormComponent,
        BankAccountFormComponent,
        RussianContractFormComponent,
        InternationalBankAccountFormComponent,
        InternationalBankAccountPartFormComponent,
        RussianBankAccountFormComponent,
        ShopCreationComponent,
        ShopDetailsChangeComponent,
        ShopCategoryChangeComponent,
        ShopLocationChangeComponent,
        ContractTerminationComponent,
        ShopAccountCreationComponent,
        ShopPayoutScheduleChangeComponent,
        ContractLegalAgreementBindingComponent,
        ContractAdjustmentCreationComponent
    ],
    exports: [
        ShopDetailsComponent,
        ContractDetailsComponent,
        ContractorDetailsComponent,
        RussianContractorDetailsComponent,
        InternationalContractorDetailsComponent,
        BankAccountDetailsComponent,
        InternationalBankAccountDetailsComponent,
        PayoutToolDetailsComponent,
        ShopFormComponent,
        ContractFormComponent,
        PayoutToolFormComponent,
        BankAccountFormComponent,
        RussianContractFormComponent,
        InternationalBankAccountFormComponent,
        RussianBankAccountFormComponent,
        ShopCreationComponent,
        ShopDetailsChangeComponent,
        ShopCategoryChangeComponent,
        ShopLocationChangeComponent,
        ContractTerminationComponent,
        ShopAccountCreationComponent,
        ShopPayoutScheduleChangeComponent,
        ContractLegalAgreementBindingComponent,
        ContractAdjustmentCreationComponent
    ],
    providers: [
        ShopFormService,
        ContractFormService,
        PayoutToolFormService,
        BankAccountFormService,
        InternationalContractFormService,
        RussianContractFormService,
        InternationalBankAccountFormService,
        RussianBankAccountFormService
    ]
})
export class DomainModule {}
