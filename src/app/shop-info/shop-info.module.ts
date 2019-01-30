import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GrowlModule } from 'primeng/primeng';

import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';
import { DomainModule } from 'koffing/domain/domain.module';
import { ShopInfoComponent } from './shop-info.component';
import { ContractManageComponent } from './contract-manage/contract-manage.component';
import { ContractCreateComponent } from './contract-create/contract-create.component';
import { ContractSelectComponent } from './contract-select/contract-select.component';
import { PayoutToolSelectComponent } from './payout-tool-select/payout-tool-select.component';
import { PayoutToolCreateComponent } from './payout-tool-create/payout-tool-create.component';

@NgModule({
    imports: [BrowserModule, FormsModule, GrowlModule, CommonModule, BackendModule, DomainModule],
    declarations: [
        ShopInfoComponent,
        ContractManageComponent,
        ContractCreateComponent,
        ContractSelectComponent,
        PayoutToolSelectComponent,
        PayoutToolCreateComponent
    ]
})
export class ShopInfoModule {}
