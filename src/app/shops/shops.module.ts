import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ShopsRoutingModule } from './shops-routing.module';
import { ClaimsComponent } from './components/shop-management/claims/claims.component';
import { ShopCreationComponent } from './components/shop-management/claims/shop-creation/shop-creation.component';
import { ShopModificationComponent } from './components/shop-management/claims/shop-modification/shop-modification.component';
import { ModificationDetailComponent } from './components/shop-management/claims/modification-detail/modification-detail.component';
import { AddShopComponent } from './components/shop-management/add-shop/add-shop.component';
import { EditShopComponent } from './components/shop-management/edit-shop/edit-shop.component';
import { ShopManagementComponent } from './components/shop-management/shop-management.component';
import { CommonModule } from 'koffing/common/common.module';
import { BackendModule } from 'koffing/backend/backend.module';

@NgModule({
    imports: [
        ShopsRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
        BackendModule
    ],
    declarations: [
        ShopManagementComponent,
        ClaimsComponent,
        ShopCreationComponent,
        ShopModificationComponent,
        ModificationDetailComponent,
        AddShopComponent,
        EditShopComponent
    ]
})
export class ShopsModule { }

export * from './components/shop-management/shop-management.component';
export * from './classes/shop-args.class';
